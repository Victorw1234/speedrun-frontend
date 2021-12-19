import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import '../Css/GameListEntry.css'
import { APIContext } from '../APIContext';

function GameListEntry({title,titleUrl,imageName}) {
    const API = useContext(APIContext);
    return (
        
            <div id="game-list-entry" className="card">
                <Link to={`/Game/${titleUrl}`}>
                    <img alt="halo3.jpg" src={`${API}/Resources/Images/${imageName}`}/>
                    <p>{title}</p>
                </Link>
            </div>
        
    )
}

export default GameListEntry
