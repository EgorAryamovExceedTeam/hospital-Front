import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";

const NoteBar = () => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const [correct, setCorrect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correct) {
      await axios
        .post(
          "http://localhost:8000/addNewNote",
          {
            name: name,
            doctor: doctor,
            date: date,
            complaint: complaint,
          },
          {
            "Access-Control-Allow-Origin": "*",
            Authorisation: `${JSON.parse(localStorage.getItem("token"))}`,
          }
        )
        .then((result) => {
          console.log("done");
        });
    }
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
        <TextField
          type="date"
          name="date"
          className="text-field"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e)}
        />
      </div>
      <div className="text-field-container complaint">
        <p>Жалобы:</p>
        <TextField
          name="complaint"
          className="text-field"
          variant="outlined"
          value={complaint}
          multiline
          onChange={(e) => setComplaint(e)}
        />
      </div>
      <Button className="send-note" type="submit" disabled={!correct}>
        Добавить
      </Button>
    </form>
  );
};

export default NoteBar;
