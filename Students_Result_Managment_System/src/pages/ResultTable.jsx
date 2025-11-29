import React, { useState, useEffect } from "react";
import DeleteDialog from "../model/DeleteDialog";
import axios from "axios";

const ResultTable = () => {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [examdate, setExamdate] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/results/${deleteId}`);
      setOpenDelete(false);
      fetchResults();
    } catch (err) {
      console.log(err);
    }
  };

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
      );
      setStudents(studentList);

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchResults().finally(() => setLoading(false));
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
      resetForm();
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setName("");
    setSubject("");
    setMarks("");
    setGrade("");
    setExamdate("");
  };

  const openEditModal = (item) => {
    setEditData(item);
    setName(item.name);
    setSubject(item.subject);
    setMarks(item.marks);
    setGrade(item.grade);
    setExamdate(item.examdate);
    setEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updated = { name, subject, marks, grade, examdate };

    try {
      await axios.put(`http://localhost:3000/results/${editData.id}`, updated);
      setEditForm(false);
      fetchResults();
      resetForm();
    } catch (err) {
      alert("Update failed");
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
        <button className="add-btn" onClick={() => setShowForm(true)}>Add New Result</button>
      </div>

     
      <div className="filters" style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="all">All Students</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="all">All Subjects</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.name}>{sub.name}</option>
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
              <input type="number" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} required />
              <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
              <input type="date" value={examdate} onChange={(e) => setExamdate(e.target.value)} required />

              <div className="modal-btns">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {editForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Result</h2>

            <form onSubmit={handleUpdate}>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} required />
              <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
              <input type="date" value={examdate} onChange={(e) => setExamdate(e.target.value)} required />

              <div className="modal-btns">
                <button type="submit" className="save-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setEditForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
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
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(r)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setDeleteId(r.id);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openDelete && (
        <DeleteDialog
          close={() => setOpenDelete(false)}
          confirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ResultTable;
