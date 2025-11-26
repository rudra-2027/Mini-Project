import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionForm from "../model/SectionForm";
import DeleteDialog from "../model/DeleteDialog";

const SectionTable = () => {
  const [sections, setSections] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

  const API = "http://localhost:3000/sections";
  console.log(deleteId);

  const fetchSections = async () => {
    try {
      const { data } = await axios.get(API);
      setSections(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);


  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/${deleteId}`);
      setOpenDelete(false);
      fetchSections();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="student-container">
      <div className="head">
        <h1>Section Management</h1>

        <button
          className="add-btn"
          onClick={() => {
            setEditData(null);
            setOpenForm(true);
          }}
        >
          Add New Section
        </button>
      </div>

      <div className="table-col">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Total Students</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sections.length > 0 ? (
              sections.map((sec) => (
                <tr key={sec.id}>
                  <td>{sec.name}</td>
                  <td>{sec.description}</td>
                  <td>{sec.totalStudent}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditData(sec);
                        setOpenForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setDeleteId(sec.id);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openForm && (
        <SectionForm
          close={() => setOpenForm(false)}
          refresh={fetchSections}
          editData={editData}
        />
      )}

      {openDelete && (
        <DeleteDialog
          close={() => setOpenDelete(false)}
          confirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default SectionTable;
