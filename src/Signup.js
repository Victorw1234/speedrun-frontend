import React,{useState,useContext} from 'react'
import {Link } from "react-router-dom";
import { APIContext } from './APIContext';

function Signup() {

    const API = useContext(APIContext)
    const [formUsername,setFormUsername] = useState('')
    const [formPassword,setFormPassword] = useState('')
    const [formConfirmPassword,setFormConfirmPassword] = useState('')
    const [signedUp,setSignedUp] = useState(false)

    async function fetchSignUp() {
        let response = await fetch(`${API}/api/Signup`,{
            method:'POST',
            mode:'cors',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username:formUsername,
                Password:formPassword,
                ConfirmPassword:formConfirmPassword
            })
        })
        response = response.json()
        return response;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        fetchSignUp().then((data) => {
            console.log(data)
            setSignedUp(data.signedUp)
        });



    }

    return (
        <div>
            {!signedUp ? 
            <>
                <h3>Sign up</h3>
                <form>
                    <input value={formUsername} onChange={(e) => {setFormUsername(e.target.value)}} type="text"/>
                    <input value={formPassword} onChange={(e) => {setFormPassword(e.target.value)}} type="password"/>
                    <input value={formConfirmPassword} onChange={(e) => {setFormConfirmPassword(e.target.value)}} type="password"/>
                    <input onClick={handleFormSubmit} type="submit"/>
                </form>
                <p>Already a member? Log in <Link to="/Login">here</Link></p>
            </>
            :
            <p>Grats on signing up</p>
            }
            
        </div>
    )
}

export default Signup
