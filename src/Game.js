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
      if (data == emptyGameInfo) {
        history.push("/404");
      }
      console.log(data);
      setGameInfo(data);
    });
  }, []);

  console.log(match.params.title);
  return (
    <div id="game" className="box-styling">
      <h3>{gameInfo != null && gameInfo.title}</h3>

      {gameInfo != null && (
        <CategoryExtensionsList
          list={gameInfo.categoryExtensions}
          gameUrl={match.params.title}
        />
      )}

      <TimesList match={match} />
    </div>
  );
}

export default Game;
