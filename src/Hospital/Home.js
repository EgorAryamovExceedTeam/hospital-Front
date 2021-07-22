import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NoteBar from "./NoteBar";
import SortNotes from "./SortNotes";
import NotesTable from "./NotesTable";

const Home = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:8000/", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          setNotes([...result.data.data]);
        })
        .catch((err) => {
          history.push("/");
        });
    }
    fetchData();
  }, []);

  const deleteToken = () => {
    localStorage.clear();
    history.push("/auth/login");
  };

  return (
    <div className="home-page-container">
      <header className="home-header">
        <h1 className="header-text">Приемы</h1>
        <Button className="exit" onClick={deleteToken} variant="outlined">
          Выход
        </Button>
      </header>
      <div className="home-body">
        <NoteBar setNotes={setNotes} />
        <SortNotes notes={notes} setNotes={setNotes} />
        <NotesTable notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
};

export default Home;
