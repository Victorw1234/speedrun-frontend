import React, { useEffect, useContext, useState } from "react";
import { APIContext } from "./APIContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import GameListEntry from "./Components/GameListEntry";
import { UserContext } from "./UserContext";
import "./Css/GameList.css";

function GameList() {
  const [listOfGames, setListOfGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSiteModerator,setIsSiteModerator] = useState(false)
  const username = useContext(UserContext);


  const API = useContext(APIContext);

  async function fetchListOfGames() {
    let response = await fetch(`${API}/api/Game`);
    response = response.json();
    return response;
  }

  async function fetchIsSiteModerator() {
    let response = await fetch(`${API}/Login`,{credentials: "include"});
    response = response.json();
    return response;
  }

  useEffect(() => {
    setLoading(listOfGames.length <= 0);
  }, [listOfGames]);

  // used to fetch games from api when the component first renders
  useEffect(() => {
    let games = fetchListOfGames();

    games.then((data) => {
      setListOfGames(data);
    });

    let siteMod = fetchIsSiteModerator();

    siteMod.then((data) => {
      setIsSiteModerator(data.siteModerator)
      console.log(data);
    }) 

    console.log(games);
  }, []);

  const listOfGamesJSX = listOfGames.map((data, index) => {
    return <GameListEntry titleUrl={data.urlTitle} 
                          title={data.title} 
                          imageName={data.imageName}/>;
  });

  return (
    <div id="game-list">
      {isSiteModerator && <h1>Länk för att lägga till spel</h1>}
      {loading && <Loading />}
      {listOfGamesJSX}
    </div>
  );
}

export default GameList;
