import React,{useContext} from 'react'
import { APIContext } from './APIContext';
function Logout({updateUser}) {
    const API = useContext(APIContext)

    function handleLogout() {
        updateUser(null)
        console.log("Logout");
        fetch(API+'/Login/Logout', {
            method:'GET',
            mode:'cors',
            credentials:'include'
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout
