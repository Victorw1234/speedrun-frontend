import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContext";
import CategoryExtensionsList from "./CategoryExtensionsList";
import TimesList from "./TimesList";
import "./Css/Game.css";
import { UserContext } from "./UserContext";
import useFetch from "./useFetch";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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
  const [update,setUpdate] = useState(0);
  const [showChangeImg,setShowChangeImg] = useState(false)
  const [gameInfo,loading] = useFetch(`${API}/api/Game/ByString/${match.params.title}`,emptyGameInfo)
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
    console.log(gameInfo.hasOwnProperty("statuscode"))
  },[gameInfo])

  return (
    <>
    {gameInfo.success == false && <Redirect to="/404"/> /* If gameinfo has succes set to false,
                                                                   it means the game probably doesnt exist */ } 
    {gameInfo.success &&
    <div id="game" className="box-styling">
      
      {gameInfo != null && !loading && <>
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
        
        <h3>{gameInfo != null && !loading && gameInfo.title}</h3>
        <div id="game-admins">
          <h4 id="game-admins">Game admins:</h4> 
        {gameInfo != null && !loading && gameInfo.admins.map((e,index) => {return <p key={index}>{e}</p> })}
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
      }
    </>
  
  );
}

export default Game;
