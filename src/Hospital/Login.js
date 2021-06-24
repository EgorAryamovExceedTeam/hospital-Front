import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // test states before send data
    const fieldsEmpty = login && password;
    const hasErrors = !(loginErr || passwordErr);
    if (fieldsEmpty && hasErrors) {
      try {
        await axios
          .post("http://localhost:8000/auth/login", {
            login: formData.get("login"),
            password: formData.get("password"),
          })
          .then((result) => {
            localStorage.setItem("token", result.data.token);
            // redirect to home page
            history.push("/home");
          });
      } catch (e) {
        const answer = window.confirm(e.response.data.message);
        if (answer) {
          // redirect to registration page
          history.push("/auth/registration");
        } else {
        }
      }
    } else {
      alert("Some fields has no correct value");
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

  return (
    <div className="login-container">
      <header className="login-header">
        {/* <img src=""></img> */}
        <h1 className="header-text">Войти в систему</h1>
      </header>
      <div className="login-body">
        {/* <img src=""></img> */}
        <form className="login-form" onSubmit={handlerSubmit}>
          <h2 className="login-form-text">Войти в систему</h2>
          <div className="login-field-container login">
            <p>Login:</p>
            <TextField
              className="login-text-field"
              name="login"
              type="text"
              variant="outlined"
              placegolder="login"
              value={login}
              onChange={(e) => changeLogin(e)}
              error={loginErr}
              helperText={loginErr ? "login length must be over 5 simbols" : ""}
            />
          </div>
          <div className="login-field-container password">
            <p>Password:</p>
            <TextField
              className="login-text-field"
              name="password"
              type="password"
              variant="outlined"
              placegolder="password"
              value={password}
              onChange={(e) => changePassword(e)}
              error={passwordErr}
              helperText={
                passwordErr
                  ? "password must contain at 6 or more simbols and least one digit"
                  : ""
              }
            />
          </div>
          <div className="login-button-and-link">
            <Button className="send-form-login" type="submit">
              Войти
            </Button>
            <Link to="/auth/registration">Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
