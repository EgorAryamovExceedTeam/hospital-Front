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

const EditNode = ({ editStatus, setEditStatus, item, setItem, setNotes }) => {
  const history = useHistory();
  const [editedName, setEditedName] = useState(item.name);
  const [editedDoctor, setEditedDoctor] = useState(item.doctor);
  const [editedDate, setEditedDate] = useState(new Date());
  const [editedComplaint, setEditedComplaint] = useState(item.complaint);
  const [flag, setFlag] = useState(false);

  const { _id, name, doctor, date, complaint, login } = item;

  useEffect(() => {
    const correct = editedName && editedDoctor && editedDate && editedComplaint;
    setFlag(correct);
  }, [editedName, editedDoctor, editedDate, editedComplaint]);

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
          login: login,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
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
        history.push("/");
      });
    setEditStatus(false);
    setItem();
  };
  return (
    <div className="dialog-container">
      <Dialog open={editStatus} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">???????????????? ??????????</DialogTitle>
        <DialogContent>
          <div className="field-container">
            <p>??????</p>
            <TextField
              className="textfield name"
              variant="outlined"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className="field-container">
            <p>????????</p>
            <Select
              name="doctor"
              className="text-field"
              variant="outlined"
              value={editedDoctor}
              onChange={(e) => setEditedDoctor(e.target.value)}
            >
              <MenuItem value="" />
              <MenuItem value="???????????? ???????? ????????????????">
                ???????????? ???????? ????????????????
              </MenuItem>
              <MenuItem value="???????????? ???????? ????????????????">
                ???????????? ???????? ????????????????
              </MenuItem>
              <MenuItem value="?????????????? ???????? ??????????????????">
                ?????????????? ???????? ??????????????????
              </MenuItem>
            </Select>
          </div>
          <div>
            <p>????????</p>
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
            <p>????????????:</p>
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
