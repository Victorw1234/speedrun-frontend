import React,{useContext} from 'react'
import {Link } from "react-router-dom";
import Logout from './Logout';
import { UserContext } from './UserContext';
import './Css/Header.css'

function Header({updateUser}) {

    const username = useContext(UserContext)

    return (
        <div className="page-header">
            <h1>Speedrun</h1>
            <nav>
                <span style={{'textAlign':'left'}}>
                    <Link to="/">Home</Link>
                    {username == null && <Link to="/Login">Login</Link>}
                </span>
                <span>
                    {username != null && username}
                    {username != null && <Logout updateUser={updateUser} />}
                </span>
                
            </nav>
        </div>
    )
}

export default Header
