import React,{useEffect,useContext,useState} from 'react'
import { APIContext } from './APIContext'
import TimeParser from './TimeParser'

function TimesList({gameUrl,categoryExtensionUrl}) {
    const API = useContext(APIContext)
    const [listOfTimes,setListOfTimes] = useState([])

    async function fetchTimeData() {
        let response = await fetch(`${API}/api/Time/${gameUrl}/${categoryExtensionUrl}`)
        response = response.json();
        return response;
    }

    useEffect(() => {

        let times = fetchTimeData();
        times.then((data) => {
            console.log(data)
            setListOfTimes(data)
        }) 

    },[gameUrl,categoryExtensionUrl])

    const listOfTimesJSX = listOfTimes.map((data,index) => {
        return  <tr key={index}>
                    <td>{data.username}</td>
                    <td><a href={data.link}>Link</a></td>
                    <td>{TimeParser.onlyHoursMinutesSeconds(data.runTime)}</td>
                </tr>
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>username</th>
                    <th>link</th>
                    <th>runtime</th>
                </tr>
            </thead>
            <tbody>
                {listOfTimesJSX}
            </tbody>
        </table>
    )
}

export default TimesList
