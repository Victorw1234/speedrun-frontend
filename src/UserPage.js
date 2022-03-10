import React, { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
import TimeParser from "./TimeParser";

import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";
import { APIContext } from "./APIContext";

function UserPage({ match }) {
    const API = useContext(APIContext);
    const [userTimes, userTimesLoading] = useFetch(
        `${API}/api/User/Userdata/${match.params.username}`
    );
    const [userNotFoundError, setUserNotFoundError] = useState(true);

    useEffect(() => {
        if (userTimesLoading) return;
        if ("success" in userTimes) {
            setUserNotFoundError(true);
        } else {
            setUserNotFoundError(false);
        }
    }, [userTimes]);

    return (
        <>
            {userNotFoundError ? (
                <h2>User Not Found</h2>
            ) : (
                <>
                    <h1>{match.params.username}</h1>
                    <h2>Times:</h2>
                    {!userTimesLoading && userTimes != null && (
                        <>
                            {userTimes.map((val) => {
                                return (
                                    <>
                                        <h3>{val.game}</h3>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Category
                                                    </TableCell>
                                                    <TableCell>Time</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {val.times.map((times) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>
                                                                {times.category}
                                                            </TableCell>
                                                            <TableCell>
                                                                {TimeParser.onlyHoursMinutesSeconds(
                                                                    times.time
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </>
                                );
                            })}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default UserPage;
