import { Button, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "./APIContext";
import Loading from "./Loading";
import "./Css/Form.css";
import "./Css/Signup.css";

function Signup() {
  const API = useContext(APIContext);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formUsernameError, setFormUsernameError] = useState("");
  const [formPasswordError, setFormPasswordError] = useState("");
  const [formConfirmPasswordError, setFormConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  async function fetchSignUp() {
    let response = await fetch(`${API}/api/Signup`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: formUsername,
        Password: formPassword,
        ConfirmPassword: formConfirmPassword,
      }),
    });
    response = response.json();
    return response;
  }

  function validateForm() {
    setFormUsernameError("");
    setFormPasswordError("");
    setFormConfirmPasswordError("");
    let errorCount = 0;
    if (formUsername.length < 3 || formUsername.length > 25) {
      setFormUsernameError("Username must be between 3 and 25 characters");
      errorCount++;
    }
    let myRe = new RegExp("^[a-zA-Z0-9_.-]*$");
    let validateChars = myRe.test(formUsername);
    if (!validateChars) {
      setFormUsernameError(
        "You are only allowed letters and numbers in your name"
      );
      errorCount++;
    }

    if (formPassword.length < 6 || formPassword.length > 100) {
      setFormPasswordError("Password Must be between 6 and 100 characters");
      errorCount++;
    }

    if (formPassword !== formConfirmPassword) {
      setFormConfirmPasswordError("Passwords do not match");
      errorCount++;
    }

    return errorCount === 0;
  }

  async function handleFormSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    let formValidated = validateForm();
    if (!formValidated) {
      setIsLoading(false);
      return;
    }
    let response = await fetchSignUp();
    console.log(response);
    setSignedUp(response.signedUp);
    setIsLoading(false);
  }

  return (
    <div id="form-div">
      {!signedUp ? (
        <>
          <h3>Sign up</h3>
          <form id="signup-form">
            <TextField
              size="Big"
              value={formUsername}
              className="TextFieldModify"
              label="Username"
              required
              id="standard-basic"
              helperText={formUsernameError}
              error={formUsernameError !== ""}
              onChange={(e) => {
                setFormUsername(e.target.value);
              }}
            />
            <TextField
              size="Big"
              className="TextFieldModify"
              label="Password"
              required
              id="standard-basic"
              value={formPassword}
              helperText={formPasswordError}
              error={formPasswordError !== ""}
              onChange={(e) => {
                setFormPassword(e.target.value);
              }}
              type="password"
            />
            <TextField
              size="Big"
              label="Confirm Password"
              className="TextFieldModify"
              required
              id="standard-basic"
              value={formConfirmPassword}
              helperText={formConfirmPasswordError}
              error={formConfirmPasswordError !== ""}
              onChange={(e) => {
                setFormConfirmPassword(e.target.value);
              }}
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              className="TextFieldModify"
              size="Normal"
              onClick={handleFormSubmit}
              type="submit"
            >
              Sign up
            </Button>
          </form>
          <p>
            Already a member? Log in <Link to="/Login">here</Link>
          </p>
        </>
      ) : (
        <p>Grats on signing up</p>
      )}

      {isLoading && <Loading />}
    </div>
  );
}

export default Signup;
