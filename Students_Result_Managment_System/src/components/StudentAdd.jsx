import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAdd = ({ closeModal, editMode, studentData }) => {
  const API = "http://localhost:3000";

  const [sections, setSections] = useState([]);


  const [name, setName] = useState(studentData?.name || "");
  const [email, setEmail] = useState(studentData?.email || "");
  const [section, setSection] = useState(studentData?.section || "");
  const [enrollmentDate, setEnrollmentDate] = useState(
    studentData?.enrollmentDate || ""
  );

  const fetchSection = async () => {
    try {
      const { data } = await axios.get(API + "/sections");
      setSections(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSection();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      section,
      enrollmentDate,
    };

    try {
      if (editMode) {

        await axios.put(`${API}/students/${studentData.id}`, data);
        alert("Student Updated Successfully!");
      } else {

        await axios.post(API + "/students", data);
        alert("Student Added Successfully!");
      }

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{editMode ? "Edit Student" : "Add New Student"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Section</label>
        <select
          required
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Select Section</option>
          {sections.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Enrollment Date</label>
        <input
          type="date"
          required
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
        />

        <button type="submit">
          {editMode ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentAdd;
