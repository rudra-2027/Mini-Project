import React, { useState, useEffect } from "react";
import axios from "axios";

const SectionForm = ({ close, refresh, editData }) => {
  const API = "http://localhost:3000/sections";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalStudent, setTotal] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description);
      setTotal(editData.totalStudent);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      totalStudent,
    };

    try {
      if (editData) {
        
        await axios.put(`${API}/${editData.id}`, payload);
      } else {
        
        await axios.post(API, payload);
      }

      refresh();
      close();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{editData ? "Edit Section" : "Add Section"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Section Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Total Students"
            value={totalStudent}
            onChange={(e) => setTotal(e.target.value)}
            required
          />

          <div className="btn-row">
            <button type="submit" className="save-btn">
              {editData ? "Update" : "Add"}
            </button>

            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionForm;
