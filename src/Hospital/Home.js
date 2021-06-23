import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NoteBar from "./NoteBar";

const Home = () => {
  let history = useHistory();
  const deleteToken = () => {
    localStorage.clear();
    history.push("/auth/login");
  };

  return (
    <div className="home-page-container">
      <header className="home-header">
        <h1 className="header-text">Приемы</h1>
        <Button className="exit" onClick={() => deleteToken}>
          Выход
        </Button>
      </header>
      <div className="home-body">
        <NoteBar />
      </div>
    </div>
  );
};

export default Home;
