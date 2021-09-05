import React,{useEffect,useContext,useState} from 'react'
import { APIContext } from './APIContext'
import TimeParser from './TimeParser'
import { Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import './Css/TimesList.css'

function TimesList({match}) {
    const API = useContext(APIContext)
    const [listOfTimes,setListOfTimes] = useState([])
    let fetchAgain = 0;

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

    let cellStyle = {'padding':'6px'}

    const listOfTimesJSX = listOfTimes.map((data,index) => {
        return  <TableRow key={index}>
                    <TableCell style={cellStyle}>{index+1}</TableCell>
                    <TableCell style={cellStyle}>{data.username}</TableCell>
                    <TableCell style={cellStyle}><a href={data.link}>Link</a></TableCell>
                    <TableCell style={cellStyle}>{TimeParser.onlyHoursMinutesSeconds(data.runTime)}</TableCell>
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
