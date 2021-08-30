import React, { useState, useContext } from "react";
import { APIContext } from "./APIContext";
import useLocalStorage from "./useLocalStorage";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Login({ updateUser }) {
  const username = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState("")
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
        updateUser(data.username)
      }
      else {
        setLoginError("That user does not exist")
      }
    });
  }

  return (
    <div>
      {username == null ? (
        <>
          Login page
          <form>
            <input
              placeholder="username"
              onChange={(e) => {
                setInputUsername(e.target.value);
              }}
              value={inputUsername}
              type="text"
            />
            <input
              placeholder="password"
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
              value={inputPassword}
              type="password"
            />
            <input onClick={onFormSubmit} type="submit" />
          </form>
          <div style={{color:"red"}}>{loginError}</div>
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
