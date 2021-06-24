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

const NotesTable = ({ notes, setNotes, setEditing, setDeleting }) => {
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
                  <EditIcon className="edit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => setEditing(true)}
                >
                  <DeleteIcon
                    className="delete"
                    onClick={() => setDeleting(true)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotesTable;
