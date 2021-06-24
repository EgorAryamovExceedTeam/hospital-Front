import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NoteBar from "./NoteBar";
import NotesTable from "./NotesTable";

const Home = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getFetch = async () => {
    await axios
      .get("http://localhost:8000/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setNotes([...result.data.data]);
      });
  };

  getFetch();

  const deleteToken = () => {
    localStorage.clear();
    history.push("/auth/login");
  };

  return (
    <div className="home-page-container">
      <header className="home-header">
        <h1 className="header-text">Приемы</h1>
        <Button className="exit" onClick={deleteToken}>
          Выход
        </Button>
      </header>
      <div className="home-body">
        <NoteBar setNotes={setNotes} />
        <NotesTable
          notes={notes}
          setNotes={setNotes}
          setEditing={setEditing}
          setDeleting={setDeleting}
        />
      </div>
    </div>
  );
};

export default Home;
