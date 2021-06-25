import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

const NotesTable = ({ notes, setNotes }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [item, setItem] = useState();
  const [deleteStatus, setDeleteStatus] = useState();
  const handlerEdit = (note) => {
    setEditStatus(true);
    setItem(note);
    console.log(note.date);
  };

  const handlerDelete = (note) => {
    setDeleteStatus(true);
    setItem(note);
  };
  return (
    <TableContainer className="table-container">
      <Table className="table">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell align="center">Имя</TableCell>
            <TableCell align="center">Врач</TableCell>
            <TableCell align="center">Дата</TableCell>
            <TableCell align="center">Жалобы</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {notes.map((note, index) => (
            <TableRow key={`${index}`}>
              <TableCell align="center">{note.name}</TableCell>
              <TableCell align="center">{note.doctor}</TableCell>
              <TableCell align="center">{note.date}</TableCell>
              <TableCell align="center">{note.complaint}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="edit">
                  <EditIcon
                    className="edit"
                    onClick={() => handlerEdit(note)}
                  />
                </IconButton>
                <IconButton>
                  <DeleteIcon
                    className="delete"
                    onClick={() => handlerDelete(note)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editStatus && (
        <EditNote
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          item={item}
          setItem={setItem}
          setNotes={setNotes}
        />
      )}
      {deleteStatus && (
        <DeleteNote
          deleteStatus={deleteStatus}
          setDeleteStatus={setDeleteStatus}
          item={item}
          setItem={setItem}
          setNotes={setNotes}
        />
      )}
    </TableContainer>
  );
};

export default NotesTable;
