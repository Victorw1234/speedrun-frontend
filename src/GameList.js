import React, { useEffect, useContext, useState } from "react";
import { APIContext } from "./APIContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function GameList() {
  const [listOfGames, setListOfGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = useContext(APIContext);

  async function fetchListOfGames() {
    let response = await fetch(`${API}/api/Game`);
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

    console.log(games);
  }, []);

  const listOfGamesJSX = listOfGames.map((data, index) => {
    return (
      <li key={index}>
        <Link to={`/Game/${data.urlTitle}`}>{data.title}</Link>
      </li>
    );
  });

  return (
    <div>
      {loading && <Loading />}
      {listOfGamesJSX}
    </div>
  );
}

export default GameList;
