import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContext";
import CategoryExtensionsList from "./CategoryExtensionsList";
import TimesList from "./TimesList";
import "./Css/Game.css";


const emptyGameInfo = {
  admins: [],
  categoryExtensions: [],
  title: "",
  urlTitle: "",
};

function Game({ match, history }) {
  const API = useContext(APIContext);
  const [gameInfo, setGameInfo] = useState(null);

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
  }, []);

  console.log(match.params.title);
  return (
    <div id="game" className="box-styling">
      {gameInfo != null && <>
      <div id="game-info">
        <img alt="gameimg" style={{'width':'200px','height':'200px'}} src={`${API}/Resources/Images/${gameInfo.imageName}`}/>     
        <h3>{gameInfo != null && gameInfo.title}</h3>
        <h4 id="game-admins">Game admins:</h4> 
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
