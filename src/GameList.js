import React, { useEffect, useContext, useState } from "react";
import { APIContext } from "./APIContext";
import Loading from "./Loading";
import GameListEntry from "./Components/GameListEntry";
import "./Css/GameList.css";
import { Button } from "@material-ui/core";
import PopupMenu from "./Components/PopupMenu";
import AddGame from "./AddGame";
import useFetch from "./useFetch";


function GameList() {
  const API = useContext(APIContext);
  const [showAddGameMenu,setShowAddGameMenu] = useState(false)
  const [listOfGames,loading] = useFetch(`${API}/api/Game`,[])
  const [isSiteModerator] = useFetch(`${API}/Login`,{siteModerator:false},{credentials: "include"})

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

    {isSiteModerator.siteModerator && 
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
