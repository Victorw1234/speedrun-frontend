import React,{useEffect,useContext,useState} from 'react'
import { APIContext } from './APIContext'
import TimeParser from './TimeParser'
import { Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import './Css/TimesList.css'
import { UserContext } from "./UserContext";
import { Link } from 'react-router-dom';

function TimesList({match,gameAdmins}) {
    const API = useContext(APIContext)
    const [listOfTimes,setListOfTimes] = useState([])
    const user = useContext(UserContext)


    useEffect(() => {
        async function fetchTimeData() {
            let response = await fetch(`${API}/api/Time/${match.params.title}/${match.params.categoryExtension}`)
            response = response.json();
            return response;
        }

        if (match.params.categoryExtension === undefined)
            return

        let times = fetchTimeData();
        times.then((data) => {
            setListOfTimes(data)
        }) 

    },[match.params.title,match.params.categoryExtension,API])

    let cellStyle = {'padding':'6px'}

    const listOfTimesJSX = listOfTimes.map((data,index) => {
        return  <TableRow key={index}>
                    <TableCell style={cellStyle}>{index+1}</TableCell>
                    <TableCell style={cellStyle}><Link to={`/User/${data.username}`}>{data.username}</Link></TableCell>
                    <TableCell style={cellStyle}><a href={data.link}>Link</a></TableCell>
                    <TableCell style={cellStyle}>{TimeParser.onlyHoursMinutesSeconds(data.runTime)}</TableCell>
                    {(gameAdmins.includes(user) || data.username === user) && <TableCell style={cellStyle}>Remove Time</TableCell>}
                </TableRow>
    })
    return (
        
        <div id="time-list">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={cellStyle}>#</TableCell>
                        <TableCell style={cellStyle}>username</TableCell>
                        <TableCell style={cellStyle}>link</TableCell>
                        <TableCell style={cellStyle}>runtime</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listOfTimesJSX}
                </TableBody>
            </Table>
        </div>
        
    )
}

export default TimesList
