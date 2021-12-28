import React, { useEffect, useContext, useState,useRef } from "react";
import { APIContext } from "./APIContext";
import Loading from "./Loading";
import GameListEntry from "./Components/GameListEntry";
import "./Css/GameList.css";
import { Button } from "@material-ui/core";
import PopupMenu from "./Components/PopupMenu";
import AddGame from "./AddGame";
import useFetch from "./useFetch";
import Sorter from "./Sorter";


function GameList() {
  const API = useContext(APIContext);
  const [showAddGameMenu,setShowAddGameMenu] = useState(false)
  const [listOfGames,loading] = useFetch(`${API}/api/Game`,[])
  const [sortedGames,setSortedGames] = useState(listOfGames) /*listofgames stays the same. Sortedgames is a copy
  of listofgames, but sorted in the way the user wants to see it.  */
  const [isSiteModerator] = useFetch(`${API}/Login`,{siteModerator:false},{credentials: "include"})

  useEffect(() => {
    setSortedGames(listOfGames)
  },[listOfGames])

  const listOfGamesJSX = sortedGames.map((data, index) => {
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
   
      



    {<Sorter array={sortedGames} setArray={setSortedGames}/>}


      <div id="game-list">
        {loading && <Loading />}
        {listOfGamesJSX}
      </div>

    </>
  );
}

export default GameList;
