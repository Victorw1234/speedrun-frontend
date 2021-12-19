import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { APIContext } from "../APIContext";
function AddCategory({ gameTitle }) {
  const [category, setCategory] = useState("");
  const API = useContext(APIContext);

  function handleSubmit(e) {
    let obj = { gameTitle: gameTitle, CategoryName: category };
    console.log(obj);
    fetch(`${API}/api/CategoryExtension/AddCategoryExtension`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.status === 200) {
          alert("Category was added.")
      }
      else if (res.status === 400) {
          alert("Not unique url path/name")
      }
      else {
          alert("Not authorized for that action")
      }
    });
  }

  return (
    <div style={{ background: "white", padding: "16px" }}>
      <form>
        <TextField
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <Button onClick={handleSubmit}>Add Category</Button>
      </form>
    </div>
  );
}

export default AddCategory;
