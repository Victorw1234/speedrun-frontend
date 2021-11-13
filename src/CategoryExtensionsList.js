import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import PopupMenu from "./Components/PopupMenu";
import AddTime from "./AddTime";
import AddCategory from "./Components/AddCategory";

function CategoryExtensions({ list, gameUrl,gameTitle, gameAdmins }) {
  const username = useContext(UserContext);
  const [showPopupAddTime, setShowPopupAddTime] = useState(false);
  const [showPopupAddCategory, setShowPopupAddCategory] = useState(false);

  /* passed as prop to AddTime
       makes sure time gets submitted to the correct category extension*/
  const [addTimeFor, setAddTimeFor] = useState("");

  useEffect(() => {
    console.log(showPopupAddTime);
  }, [showPopupAddTime]);

  function togglePopupAddTime() {
    setShowPopupAddTime(!showPopupAddTime);
  }

  function addTimeClick(categoryExtension) {
    if (!showPopupAddTime) {
      setAddTimeFor(categoryExtension);
      togglePopupAddTime();
    }
  }

  const listOfCategoryExtensionsJSX = list.map((data, index) => {
    console.log(data);
    return (
      <>
        <div
          style={{
            padding: "8px",
            borderRadius: "2px",
            boxShadow: "0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)",
            display: "inline",
          }}
          id="category-extension-entry"
        >
          
          <Link to={(`/Game/${gameUrl}/${data.urlTitle}`)}>{data.title}</Link>
          {username != null && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addTimeClick(data.urlTitle);
              }}
            >
              +
            </button>
          )}
        </div>
      </>
    );
  });

  return (
    <>
      {showPopupAddTime === true && (
        <PopupMenu toggle={togglePopupAddTime}>
          <div
            style={{
              backgroundColor: "white",
              marginTop: "16px",
              padding: "12px",
              borderRadius: "4px",
              boxShadow:
                "box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AddTime gameUrl={gameUrl} categoryExtension={addTimeFor} />
          </div>
        </PopupMenu>
      )}
      <div
        style={{ display: "flex", flexWrap: "wrap" }}
        id="list-of-category-extensions"
      >
        {listOfCategoryExtensionsJSX}
        {gameAdmins.includes(username) && (
          <div
            style={{
              padding: "8px",
              borderRadius: "2px",
              boxShadow: "0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)",
              display: "inline",
            }}
            id="category-extension-entry"
          >
            <button
              onClick={() => {
                console.log("click");
                setShowPopupAddCategory(true);
              }}
            >
              Add Category
            </button>
          </div>
        )}
        {showPopupAddCategory === true && (
          <PopupMenu toggle={() => {setShowPopupAddCategory(false)}}>
            <AddCategory gameTitle={gameTitle}/>
          </PopupMenu>
        )}
      </div>
    </>
  );
}

export default CategoryExtensions;
