import React, { useState, useEffect } from "react";

const ResultTable = () => {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [examdate, setExamdate] = useState("");


  const [selectedStudent, setSelectedStudent] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const fetchResults = async () => {
    try {
      const res = await fetch("http://localhost:3000/results");
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();
      setResults(data);
      const subjectsList = [...new Set(data.map(r => r.subject))].map(
        (sub, index) => ({
          id: index + 1,
          name: sub
        })
      );

      setSubjects(subjectsList);

      const studentList = [...new Set(data.map(r => r.name))].map(
        (name, idx) => ({
          id: idx + 1,
          name: name
        })

      )
      setStudents(studentList)
    } catch (err) {
      setError(err.message);
    }
  };

  // const fetchStudents = async () => {
  //   const res = await fetch("http://localhost:3000/students");
  //   const data = await res.json();
  //   setStudents(data);
  // };



  useEffect(() => {
    Promise.all([fetchResults(),])
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newResult = { name, subject, marks, grade, examdate };

    try {
      const res = await fetch("http://localhost:3000/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResult),
      });

      if (!res.ok) throw new Error("Failed to add result");

      fetchResults();
      setName("");
      setSubject("");
      setMarks("");
      setGrade("");
      setExamdate("");
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredResults = results.filter((r) => {
    const studentMatch = selectedStudent === "all" || r.name === selectedStudent;
    const subjectMatch = selectedSubject === "all" || r.subject === selectedSubject;
    return studentMatch && subjectMatch;
  });

  return (
    <div className="student-container">
      <div className="head">
        <h1>Result Management</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add New Result
        </button>
      </div>


      <div className="filters" style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="all">All Students</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>


        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">All Subjects</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>


      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Result</h2>

            <form onSubmit={handleAdd}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />



              <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />


              <input
                type="number"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />

              <input
                type="date"
                value={examdate}
                onChange={(e) => setExamdate(e.target.value)}
                required
              />

              <div className="modal-btns">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <div className="table-col">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Exam Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.subject}</td>
                  <td>{r.marks}</td>
                  <td>{r.grade}</td>
                  <td>{r.examdate}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResultTable;
