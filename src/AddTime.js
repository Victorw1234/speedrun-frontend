import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { APIContext } from "./APIContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function AddTime({ match }) {
  const username = useContext(UserContext);
  const API = useContext(APIContext);

  const [formTime, setFormTime] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formLinkError, setFormLinkError] = useState("");
  const [formTimeError, setFormTimeError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [timeSubmitted, setTimeSubmitted] = useState(false);

  async function submitToAPI() {
    let response = await fetch(
      `${API}/api/Time/${match.params.title}/${match.params.categoryExtension}`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RunTime: "0001-01-01T" + formTime,
          Link: formLink,
        }),
      }
    );

    response = response.json();
    return response;
  }

  function validateForm() {
    let errorCount = 0;

    // validate link
    let expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    let validateChars = regex.test(formLink);
    if (!validateChars) {
      setFormLinkError("That is not a valid link");
      errorCount++;
    }

    // validate time
    if (formTime.length === 0) {
      setFormTimeError("Fill all time fields");
      errorCount++;
    }

    return errorCount === 0;
  }

  function handleFormSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    console.log({ formLink, formTime });
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    let response = submitToAPI();
    response.then((data) => {
      setTimeSubmitted(data.timeAdded);
      console.log(data.msg);
    });
    setIsLoading(false);
  }

  let formJSX = (
    <div>
      adding time for {match.params.title} {match.params.categoryExtension}
      <form>
        <label>Link:</label>
        <input
          value={formLink}
          onChange={(e) => {
            setFormLink(e.target.value);
          }}
          type="url"
        />
        <div>{formLinkError}</div>
        <label>Time:</label>
        <input
          value={formTime}
          onChange={(e) => {
            setFormTime(e.target.value);
          }}
          type="time"
          step="0.01"
        />
        <div>{formTimeError}</div>
        <input onClick={handleFormSubmit} type="submit" />
      </form>
    </div>
  );

  return (
    <>
      {timeSubmitted ? (
        <div>
          Congratulations on your submitted time!
          <Link to={`/Game/${match.params.title}/${match.params.categoryExtension}`}>Go back</Link>
        </div>
      ) : (
        formJSX
      )
      }
      {isLoading && <Loading/>}
    </>
  );
}

export default AddTime;
