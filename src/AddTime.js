import React,{useContext,useState} from 'react'
import { UserContext } from './UserContext';
import { APIContext } from './APIContext';


function AddTime({match}) {

    const username = useContext(UserContext);
    const API = useContext(APIContext)

    const [formTime,setFormTime] = useState('')
    const [formLink,setFormLink] = useState('')

    async function submitToAPI() {

        let response = await fetch(`${API}/api/Time/${match.params.title}/${match.params.categoryExtension}`,{
            method:'POST',
            mode:'cors',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                  RunTime:'0001-01-01T'+formTime,
                  Link : formLink})
        })

        response = response.json();
        return response;
    }


    function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formTime,formLink)
        console.log(`${API}/api/Time/${match.params.title}/${match.params.categoryExtension}`)
        let response = submitToAPI()
        response.then((data) => {
            console.log(data.msg)
        }) 
        console.log("hasdf")
    }

    return (

        <div>
            adding time for {match.params.title} {match.params.categoryExtension}

            <form>
                <label>
                    Link:
                </label>
                <input value={formLink} onChange={(e) => {setFormLink(e.target.value)}} type="url"/>
                <br/>
                <label>
                    Time: 
                </label>
                <input value={formTime} onChange={(e) => {setFormTime(e.target.value)}} type="time" step="0.01"/>
                <br/>
                <input onClick={handleFormSubmit} type="submit"/>
            </form>

        </div>
    )
}

export default AddTime
