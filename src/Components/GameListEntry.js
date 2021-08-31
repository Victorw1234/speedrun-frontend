import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/GameListEntry.css'

function GameListEntry({title,titleUrl}) {
    return (
        
            <div id="game-list-entry" class="card">
                <Link to={`/Game/${titleUrl}`}>
                    <img alt="halo3.jpg" src="halo3.jpg"/>
                    <p>{title}</p>
                </Link>
            </div>
        
    )
}

export default GameListEntry
