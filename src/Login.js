import React, { useState, useContext } from "react";
import { APIContext } from "./APIContext";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./Css/Form.css";
import "./Css/Login.css"

function Login({ updateUser }) {
  const username = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const API = useContext(APIContext);

  async function fetchLogin() {
    let response = await fetch(API + "/Login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: inputUsername,
        Password: inputPassword,
      }),
    });
    response = response.json();
    return response;
  }

  function onFormSubmit(e) {
    e.preventDefault();
    let response = fetchLogin();
    response.then((data) => {
      console.log(data);
      if (data.success) {
        updateUser(data.username);
      } else {
        setLoginError("That user does not exist");
      }
    });
  }

  return (
    <div id="form-div">
      {username == null ? (
        <>
          <h3>Login page</h3>
          <form id="login-form">
            <TextField
              className="TextFieldModify"
              required
              id="standard-basic"
              label="Username"
              onChange={(e) => {
                setInputUsername(e.target.value);
              }}
              value={inputUsername}
            />
            <TextField
              className="TextFieldModify"
              required
              id="standard-basic"
              label="Password"
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
              value={inputPassword}
              type="password"
            />
            <Button
              className="TextFieldModify"
              size="small"
              onClick={onFormSubmit}
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
          </form>
          <p style={{ color: "red" }}>{loginError}</p>
          <p>
            Not a member? Sign up <Link to="/Signup">here</Link>
          </p>
        </>
      ) : (
        <h3>You are logged in</h3>
      )}
    </div>
  );
}

export default Login;
