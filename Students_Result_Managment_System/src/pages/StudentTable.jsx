import React, { useState, useEffect } from "react";
import "../style/student.css";
import StudentAdd from "../components/StudentAdd";
import axios from "axios";

const StudentTable = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [del, setDelete] = useState(false);
  const [students, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const API = "http://localhost:3000";

  const fetchUrl = async () => {
    try {
      const res = await axios.get(API + "/students");
      if (res.data) {
        setStudent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div className="student-container">
      <div className="head">
        <h1>Student Management</h1>
        <button className="add-btn" onClick={() => setOpenAdd(true)}>
          Add New Student
        </button>
      </div>

      <div className="table-col">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Section</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.section}</td>
                <td>{s.enrollmentDate}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedStudent(s);
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-btn"
                    onClick={() => {
                      setSelectedStudent(s);
                      setDelete(true);
                    }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAdd && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setOpenAdd(false)}>
              &times;
            </button>
            <StudentAdd closeModal={() => setOpenAdd(false)} />
          </div>
        </div>
      )}
      {openEdit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setOpenEdit(false)}>
              &times;
            </button>

            <StudentAdd
              editMode={true}
              studentData={selectedStudent}
              closeModal={() => {
                setOpenEdit(false);
                fetchUrl();
              }}
            />
          </div>
        </div>
      )}
      {del && (
        <div className="modal-overlay">
          <div className="modal-box small-box">
            <h3>Are you sure you want to delete this student?</h3>

            <div className="delete-actions">
              <button className="cancel-btn" onClick={() => setDelete(false)}>
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={async () => {
                  try {
                    await axios.delete(`${API}/students/${selectedStudent.id}`);
                    setDelete(false);
                    fetchUrl();
                    alert("Student Deleted Successfully!");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default StudentTable;
