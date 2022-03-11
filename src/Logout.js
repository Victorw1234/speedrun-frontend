import { configure } from '@testing-library/react';
import React,{useContext} from 'react'
import { APIContext } from './APIContext';
import {Button} from "@material-ui/core";
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
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default Logout
