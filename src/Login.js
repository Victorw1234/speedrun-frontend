import React,{useState,useContext} from 'react'
import { APIContext } from './APIContext';
import useLocalStorage from './useLocalStorage';
import { UserContext } from './UserContext';
import {Link } from "react-router-dom";


function Login({updateUser}) {

    const username = useContext(UserContext)
    const [inputUsername,setInputUsername] = useState('')
    const [inputPassword,setInputPassword] = useState('')
    const API = useContext(APIContext)

    function onFormSubmit(e) {
        e.preventDefault();
        let Username = inputUsername
        let Password = inputPassword
        let userModel = {Username,Password}
        console.log(userModel)
        console.log(API+'/Login')
        fetch(API+'/Login',{
            method:'POST',
            mode:'cors',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userModel)
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            updateUser(data.username);
        });

        

    }

    return (
        <div>
            {username == null ?
            <>
                Login page
                <form>
                    Username:
                    <input onChange={(e) => {setInputUsername(e.target.value)}} value={inputUsername} type="text"/>
                    Password:
                    <input onChange={(e) => {setInputPassword(e.target.value)}} value={inputPassword} type="password"/>
                    <input onClick={onFormSubmit} type="submit"/>
                </form>
                <p>Not a member? Sign up <Link to="/Signup">here</Link></p>
            </> :
            <h3>You are logged in</h3>
            }
            
        </div>
    )
}

export default Login
