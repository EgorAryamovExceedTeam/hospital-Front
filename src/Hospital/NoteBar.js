import React, { useState } from "react";
import axios from "axios";
import "date-fns";
import "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

const NoteBar = ({ setNotes }) => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [complaint, setComplaint] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/addNewNote",
        {
          name: name,
          doctor: doctor,
          date: moment(date).format("DD.MM.YYYY"),
          complaint: complaint,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        setNotes([...result.data.data]);
        setName();
        setDoctor();
        setDate();
        setComplaint();
      });
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="text-field-container name">
        <p>Имя:</p>
        <TextField
          name="name"
          className="text-field"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="text-field-container doctor">
        <p>Врач:</p>
        <Select
          name="doctor"
          className="text-field"
          variant="outlined"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <MenuItem value="" />
          <MenuItem value="Иванов Иван Иванович">Иванов Иван Иванович</MenuItem>
          <MenuItem value="Петров Петр Петрович">Петров Петр Петрович</MenuItem>
          <MenuItem value="Сидоров Сидр Сидорович">
            Сидоров Сидр Сидорович
          </MenuItem>
        </Select>
      </div>
      <div className="text-field-container date">
        <p>Дата:</p>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="date"
            inputVariant="outlined"
            className="text-field"
            value={date}
            onChange={(date) => handleDateChange(date)}
            minDate={new Date()}
            format="dd.MM.yyyy"
            mask={"__.__.____"}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="text-field-container complaint">
        <p>Жалобы:</p>
        <TextField
          name="complaint"
          className="text-field"
          variant="outlined"
          value={complaint}
          multiline
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <Button
        className="send-note"
        type="submit"
        disabled={!(name && doctor && date && complaint)}
      >
        Добавить
      </Button>
    </form>
  );
};

export default NoteBar;
