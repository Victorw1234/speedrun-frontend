import React,{useContext,useState} from 'react'
import { TextField, Button } from "@material-ui/core";
import { APIContext } from './APIContext';
function AddGame() {

    const API = useContext(APIContext)
    const [titleForm,setTitleForm] = useState("");
    const [status,setStatus] = useState("")
    async function postAddGame() {
        let response = await fetch(`${API}/api/Game/AddGame`,
        {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Title:titleForm
            })
          })
        return response;
    }

    async function submitForm(e) {
        e.preventDefault();
        setStatus("Loading...");
        let res = await postAddGame();
        console.log("res.status: ",res.status)
        if (res.status == 200) {
            setStatus("")
            setTitleForm("")
            window.location.reload(); // refresh the page if successfully added to db
        }
        else if (res.status == 401) {
            setStatus("Error adding the game to the database.")
        }
    }

    return (
        <div style={{'background':'white','padding':'16px','marginTop':'160px'}}>
            <form>
                <TextField value={titleForm} onChange={(e) => {setTitleForm(e.target.value)}} type="text" placeholder="Game Name"/>
                <Button onClick={submitForm} type="submit" value="Add Game">Add Game</Button>
            </form>
            {status}
        </div>
    )
}

export default AddGame
