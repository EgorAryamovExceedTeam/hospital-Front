import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
} from "@material-ui/core";

const DeleteNote = ({
  deleteStatus,
  setDeleteStatus,
  item,
  setItem,
  setNotes,
}) => {
  const history = useHistory();

  const handleClose = () => {
    setDeleteStatus(false);
    setItem();
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:8000/deleteNote?_id=${item._id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setNotes([...result.data.data]);
        setDeleteStatus(false);
      })
      .catch((err) => {
        history.push("/");
      });
  };
  return (
    <div className="delete-container">
      <Dialog open={deleteStatus} onClose={handleClose}>
        <DialogTitle className="dialog-form-title">Удалить прием</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить прием?
          </DialogContentText>
        </DialogContent>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="outlined">
          Delete
        </Button>
      </Dialog>
    </div>
  );
};

export default DeleteNote;
