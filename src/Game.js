import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContext";
import CategoryExtensionsList from "./CategoryExtensionsList";
import TimesList from "./TimesList";
import "./Css/Game.css";
import { UserContext } from "./UserContext";


const emptyGameInfo = {
  admins: [],
  categoryExtensions: [],
  title: "",
  urlTitle: "",
};


function Game({ match, history }) {
  const API = useContext(APIContext);
  const [gameInfo, setGameInfo] = useState(null);
  const [update,setUpdate] = useState(0);
  const [showChangeImg,setShowChangeImg] = useState(false)
  const user = useContext(UserContext)

  function handleFileUpload(e) {
    let file = e.target.files[0]
    console.log(file)
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        console.log(gameInfo.title)
        let obj  = { Img : baseString, GameTitle: gameInfo.title}
        console.log(JSON.stringify(obj))
        fetch(`${API}/api/Game/AddGameImage`, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj)
        }).then((res) => res.json()).then((data) => {setUpdate(update + 1);alert(data.msg)})
    };
    reader.readAsDataURL(file);
    

  }

  async function fetchGameInfo() {
    let gameInfo = await fetch(
      `${API}/api/Game/ByString/${match.params.title}`
    );
    if (gameInfo.status >= 400 && gameInfo.status <= 499) {
      return emptyGameInfo;
    }
    gameInfo = gameInfo.json();
    return gameInfo;
  }

  useEffect(() => {
    let gameInfo = fetchGameInfo();
    gameInfo.then((data) => {
      console.log("gameInfo: ",data);
      setGameInfo(data);
    });
  }, [,update]);

  return (
    <div id="game" className="box-styling">
      {gameInfo != null && <>
      <div id="game-info">
        <div onMouseEnter={() => {setShowChangeImg(true)}} onMouseLeave={() => {setShowChangeImg(false)}}
        class="image-container" style={{"position":"relative"}}>
        <img alt="gameimg" style={{'width':'200px','height':'200px'}} src={`${API}/Resources/Images/${gameInfo.imageName}`}/>   
        {(showChangeImg && gameInfo.admins.includes(user)) && 
         <div class="changeimg" style={{
                     "position":"absolute",
                     "color":"white",
                     "bottom":"0px",
                     "left":"0px",
                     "textAlign":"center",
                     "width":"100%",
                     "background":"blue"
                     }}>
                       <form>
                         <input type="file" onChange={(e) => {handleFileUpload(e)}} ></input>
                       </form>
                     </div> } 
        </div>
        
        <h3>{gameInfo != null && gameInfo.title}</h3>
        <div id="game-admins">
          <h4 id="game-admins">Game admins:</h4> 
        {gameInfo.admins.map((e,index) => {return <p key={index}>{e}</p> })}
        </div>
        
      </div>

        
          <CategoryExtensionsList
            list={gameInfo.categoryExtensions}
            gameUrl={match.params.title}
          />
          </>
      }
        <TimesList match={match} />
    </div>
  );
}

export default Game;
