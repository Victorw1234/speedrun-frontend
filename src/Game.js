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

async function imgToBase64 (img) {
  return new Promise((resolve,reject) => {
    var reader = new FileReader();
    let baseString = ""
    reader.onloadend = function () {
      baseString = reader.result;
      resolve(baseString)
    }
    reader.readAsDataURL(img);
    reader.onerror = reject;
  })
}


function Game({ match, history }) {
  const API = useContext(APIContext);
  const [gameInfo, setGameInfo] = useState(null);
  const [update,setUpdate] = useState(0);
  const [showChangeImg,setShowChangeImg] = useState(false)
  const user = useContext(UserContext)

  async function handleFileUpload(e) {
    let file = e.target.files[0]    
    var baseString = await imgToBase64(file);
    let obj  = { Img : baseString, GameTitle: gameInfo.title}
    fetch(`${API}/api/Game/AddGameImage`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    }).then((res) => res.json()).then((data) => {setUpdate(update + 1);alert(data.msg)})
  }

  useEffect(() => {
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

    let gameInfo = fetchGameInfo();
    gameInfo.then((data) => {
      console.log("gameInfo: ",data);
      setGameInfo(data);
    });
  }, [update,API,match.params.title]);

  return (
    <div id="game" className="box-styling">
      {gameInfo != null && <>
      <div id="game-info">
        <div onMouseEnter={() => {setShowChangeImg(true)}} onMouseLeave={() => {setShowChangeImg(false)}}
        className="image-container" style={{"position":"relative"}}>
        <img alt="gameimg" style={{'width':'200px','height':'200px'}} src={`${API}/Resources/Images/${gameInfo.imageName}`}/>   
        {(showChangeImg && gameInfo.admins.includes(user)) && 
         <div className="changeimg" style={{
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
            gameUrl={gameInfo.urlTitle}
            gameTitle={gameInfo.title}
            gameAdmins={gameInfo.admins}
          />
          <TimesList match={match} gameAdmins={gameInfo.admins} />
          </>
          
      }
        
    </div>
  );
}

export default Game;
