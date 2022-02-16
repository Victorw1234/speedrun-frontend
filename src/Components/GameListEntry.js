import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Css/GameListEntry.css";
import { APIContext } from "../APIContext";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

function GameListEntry({ title, titleUrl, imageName }) {
    const API = useContext(APIContext);
    return (
        <Link
            style={{ textDecoration: "none", boxShadow: "none" }}
            to={`/Game/${titleUrl}`}
        >
            <Card style={{ margin: "12px" }}>
                <CardMedia>
                    <img
                        alt="halo3.jpg"
                        src={`${API}/Resources/Images/${imageName}`}
                        style={{ width: "300px", height: "300px" }}
                    />
                </CardMedia>
                <CardContent>
                    <Typography align="center">{title}</Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default GameListEntry;
{
    /*<div id="game-list-entry" className="card">
                <Link to={`/Game/${titleUrl}`}>
                    <img alt="halo3.jpg" src={`${API}/Resources/Images/${imageName}`}/>
                    <p>{title}</p>
                </Link>
    </div>*/
}
