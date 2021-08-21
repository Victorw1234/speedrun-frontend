import React,{useEffect,useContext,useState} from 'react'
import { APIContext } from './APIContext'
import TimeParser from './TimeParser'

function TimesList({match}) {
    const API = useContext(APIContext)
    const [listOfTimes,setListOfTimes] = useState([])

    async function fetchTimeData() {
        let response = await fetch(`${API}/api/Time/${match.params.title}/${match.params.categoryExtension}`)
        response = response.json();
        return response;
    }

    useEffect(() => {

        let times = fetchTimeData();
        times.then((data) => {
            console.log(data)
            setListOfTimes(data)
        }) 

    },[match.params.title,match.params.categoryExtension])

    const listOfTimesJSX = listOfTimes.map((data,index) => {
        return  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.username}</td>
                    <td><a href={data.link}>Link</a></td>
                    <td>{TimeParser.onlyHoursMinutesSeconds(data.runTime)}</td>
                </tr>
    })

    return (
        <div id="time-list">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>username</th>
                        <th>link</th>
                        <th>runtime</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfTimesJSX}
                </tbody>
            </table>
        </div>
        
    )
}

export default TimesList
