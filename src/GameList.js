import React, { useEffect, useContext, useState } from "react";
import { APIContext } from "./APIContext";
import Loading from "./Loading";
import GameListEntry from "./Components/GameListEntry";
import "./Css/GameList.css";
import { Button } from "@material-ui/core";
import PopupMenu from "./Components/PopupMenu";
import AddGame from "./AddGame";


function GameList() {
  const [listOfGames, setListOfGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSiteModerator,setIsSiteModerator] = useState(false)
  const [showAddGameMenu,setShowAddGameMenu] = useState(false)


  const API = useContext(APIContext);

  useEffect(() => {
    setLoading(listOfGames.length <= 0);
  }, [listOfGames]);

  // used to fetch games from api when the component renders
  useEffect(() => {
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
  }, [API]);

  const listOfGamesJSX = listOfGames.map((data, index) => {
    return <GameListEntry titleUrl={data.urlTitle} 
                          key={index}
                          title={data.title} 
                          imageName={data.imageName}/>;
  });

  return (
    <>
    
    {showAddGameMenu && 
    <PopupMenu toggle={() => {setShowAddGameMenu(!showAddGameMenu)}}>
      <AddGame/>
    </PopupMenu>
    }

    {isSiteModerator && 
      <p style={{'textAlign':'center'}}>
        <Button onClick={() => {setShowAddGameMenu(!showAddGameMenu)}}>
          Add Game (Site Mod only) 
          </Button>
      </p>
    }

    
    <div style={{'display':'flex','justifyContent':'center'}}>

    
    <div id="game-list">
      {loading && <Loading />}
      {listOfGamesJSX}
    </div>
    </div>
    </>
  );
}

export default GameList;
