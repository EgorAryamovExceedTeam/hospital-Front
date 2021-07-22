import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Registration = () => {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passErr, setPasswordErr] = useState(false);
  const [repErr, setRepErr] = useState(false);

  // send data from registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // test states before sending data
    const fieldsEmpty = login && password && repPassword;
    const hasErrors = !(loginErr || passErr || repErr);
    if (fieldsEmpty && hasErrors) {
      try {
        await axios
          .post("http://localhost:8000/auth/registration", {
            login: formData.get("login"),
            password: formData.get("password"),
          })
          .then((result) => {
            localStorage.clear();
            localStorage.setItem("token", JSON.stringify(result.data.token));
            // redirect to home page
            history.push("/home");
          });
      } catch (err) {
        let answer = window.confirm(err.response.data.message);
        if (answer) {
          // redirect to login page
          history.push("/auth/login");
        } else {
          setLogin("");
          setPassword("");
          setRepPassword("");
        }
      }
    } else {
      alert("Some fields has no correct value!");
    }
  };

  const changeLogin = (e) => {
    setLogin(e.target.value);
    const flag =
      e.target.value.length &&
      !e.target.value.match(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{6,}$/);
    setLoginErr(flag);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    const flag =
      e.target.value.length &&
      !e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
    setPasswordErr(flag);
  };

  const changeRepeatPass = (e) => {
    setRepPassword(e.target.value);
    setRepErr(e.target.value.length && e.target.value !== password);
  };

  return (
    <div className="registration-container">
      <header className="registration-header">
        {/* <img></img> */}
        <h1 className="header-text">Зарегистрироваться в системе</h1>
      </header>
      <div className="registration-body">
        {/* <img></img> */}
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2 className="registration-header">Регистация</h2>
          <div className="reg-field-container">
            <p>Login:</p>
            <TextField
              name="login"
              className="text-field"
              variant="outlined"
              placeholder="Login"
              value={login}
              onChange={(e) => changeLogin(e)}
              error={loginErr}
              helperText={loginErr ? "login length must be over 5 simbols" : ""}
            />
          </div>
          <div className="reg-field-container">
            <p>Password:</p>
            <TextField
              className="text-field"
              name="password"
              variant="outlined"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => changePassword(e)}
              error={passErr}
              helperText={
                passErr
                  ? "password must contain at 6 or more simbols and least one digit"
                  : ""
              }
            />
          </div>
          <div className="reg-field-container">
            <p>Repeat password:</p>
            <TextField
              className="text-field"
              name="repeatPassword"
              variant="outlined"
              type="password"
              placeholder="Repeat password"
              value={repPassword}
              onChange={(e) => changeRepeatPass(e)}
              error={repErr}
              helperText={repErr ? "Password mismatch" : ""}
            />
          </div>
          <div className="reg-button-and-link">
            <Button className="send-form-registration" type="submit">
              Зарегистрироваться
            </Button>
            <Link to="/auth/login">Авторизоваться</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
