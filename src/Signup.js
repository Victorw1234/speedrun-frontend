import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "./APIContext";
import Loading from "./Loading";

function Signup() {
  const API = useContext(APIContext);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formUsernameError, setFormUsernameError] = useState("");
  const [formPasswordError, setFormPasswordError] = useState("");
  const [formConfirmPasswordError, setFormConfirmPasswordError] = useState("");
  const [isLoading,setIsLoading] = useState(false)
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
    setFormUsernameError("")
    setFormPasswordError("")
    setFormConfirmPasswordError("")
    let errorCount = 0;
    if (formUsername.length < 3 || formUsername.length > 25) {
      setFormUsernameError("Username must be between 3 and 25 characters");
      errorCount++
    }
    let myRe = new RegExp("^[a-zA-Z0-9_.-]*$");
    let validateChars = myRe.test(formUsername);
    if (!validateChars) {
      setFormUsernameError(
        "You are only allowed letters and numbers in your name"
      );
      errorCount++
    }

    if (formPassword.length < 6 || formPassword.length > 100) {
      setFormPasswordError("Password Must be between 6 and 100 characters");
      errorCount++
    }

    if (formPassword != formConfirmPassword) {
      setFormConfirmPasswordError("Passwords do not match");
      errorCount++
    }

    return (errorCount === 0)

  }

  async function handleFormSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
    let formValidated = validateForm();
    if (!formValidated){
      setIsLoading(false)
      return
    }
    let response = await fetchSignUp();
    console.log(response);
    setSignedUp(response.signedUp);
    setIsLoading(false)
  }

  return (
    <div>
      {!signedUp ? (
        <>
          <h3>Sign up</h3>
          <form>
            <input
              value={formUsername}
              placeholder="username"
              onChange={(e) => {
                setFormUsername(e.target.value);
              }}
              type="text"
            />
            <div>{formUsernameError}</div>
            <input
              value={formPassword}
              placeholder="password"
              onChange={(e) => {
                setFormPassword(e.target.value);
              }}
              type="password"
            />
             <div>{formPasswordError}</div>
            <input
              value={formConfirmPassword}
              placeholder="confirm password"
              onChange={(e) => {
                setFormConfirmPassword(e.target.value);
              }}
              type="password"
            />
            <div>{formConfirmPasswordError}</div>
            <input onClick={handleFormSubmit} type="submit" />
          </form>
          <p>
            Already a member? Log in <Link to="/Login">here</Link>
          </p>
        </>
      ) : (
        <p>Grats on signing up</p>
      )}

      {isLoading && <Loading/>}
    </div>
  );
}

export default Signup;
