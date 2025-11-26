import React from "react";

const DeleteDialog = ({ close, confirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box small-box">
        <h2>Delete Section</h2>
        <p>Are you sure you want to delete this section?</p>

        <div className="btn-row">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>

          <button className="delete-btn" onClick={confirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
