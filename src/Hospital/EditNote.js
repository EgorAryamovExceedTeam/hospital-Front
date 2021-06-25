import React, { useState, useEffect } from "react";
import axios from "axios";
import "date-fns";
import "moment";
import moment from "moment";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { set } from "date-fns";

const EditNode = ({ editStatus, setEditStatus, item, setItem, setNotes }) => {
  const history = useHistory();
  const [editedName, setEditedName] = useState(item.name);
  const [editedDoctor, setEditedDoctor] = useState(item.doctor);
  const [editedDate, setEditedDate] = useState(new Date());
  const [editedComplaint, setEditedComplaint] = useState(item.complaint);
  const [flag, setFlag] = useState(false);

  const { _id, name, doctor, date, complaint } = item;

  useEffect(() => {
    const correct = editedName && editedDoctor && editedDate && editedComplaint;
    const isMatches =
      editedName === name &&
      editedDoctor === doctor &&
      moment(editedDate).format("DD.MM.YYYY") === date &&
      editedComplaint === complaint;
    setFlag(correct && !isMatches);
  }, [flag]);

  const handleClose = () => {
    setEditStatus(false);
    setItem();
  };

  const handleEdit = async () => {
    await axios
      .patch(
        "http://localhost:8000/updateInfo",
        {
          _id: _id,
          name: editedName,
          doctor: editedDoctor,
          date: moment(editedDate).format("DD.MM.YYYY"),
          complaint: editedComplaint,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((result) => {
        setNotes([...result.data.data]);
        setEditStatus(false);
        setItem();
      })
      .catch((err) => {
        history.push("/auth/login");
      });
    setEditStatus(false);
    setItem();
  };
  return (
    <div className="dialog-container">
      <Dialog open={editStatus} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Изменить прием</DialogTitle>
        <DialogContent>
          <div className="field-container">
            <p>Имя</p>
            <TextField
              className="textfield name"
              variant="outlined"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className="field-container">
            <p>Врач</p>
            <Select
              name="doctor"
              className="text-field"
              variant="outlined"
              value={editedDoctor}
              onChange={(e) => setEditedDoctor(e.target.value)}
            >
              <MenuItem value="" />
              <MenuItem value="Иванов Иван Иванович">
                Иванов Иван Иванович
              </MenuItem>
              <MenuItem value="Петров Петр Петрович">
                Петров Петр Петрович
              </MenuItem>
              <MenuItem value="Сидоров Сидр Сидорович">
                Сидоров Сидр Сидорович
              </MenuItem>
            </Select>
          </div>
          <div>
            <p>Дата</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                className="text-field"
                value={editedDate}
                placeholder={new Date()}
                onChange={(date) => setEditedDate(date)}
                minDate={new Date()}
                format="dd.MM.yyyy"
                mask={"__.__.____"}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <p>Жалобы:</p>
            <TextField
              name="complaint"
              className="text-field"
              variant="outlined"
              value={editedComplaint}
              multiline
              onChange={(e) => setEditedComplaint(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="outlined" disabled={!flag}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNode;
