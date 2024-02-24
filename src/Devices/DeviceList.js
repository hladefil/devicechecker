import React, {useContext, useEffect, useState} from "react"
import {Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";
import Device from "./Device"

const useStyles = makeStyles(theme => ({
    root: {
        height: "75vh",
        marginTop: "15vh",
        marginLeft: "4em",
        marginRight: "4em",
        paddingTop: "3em",
        gap: "2em",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        overflow: "scroll",

    },
}))

function DeviceList() {
    const classes = useStyles()
    const context = useContext(userContext);

    const [arrayOfDevices, setArrayOfDevices] = useState([]);


    useEffect(() => {
        const token = context.getToken()
        console.log(token)

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': token
            },
        };
        fetch('https://js-test-api.etnetera.cz/api/v1/phones', requestOptions)
            .then(response => response.json())
            .then(data => {
                setArrayOfDevices(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
       /* Aos.init({
            duration: 2000
        });*/
    }, []);

    // useEffect(() => {
    //     arrayOfDevices.forEach((item, index) => {
    //         console.log(`Object ${index + 1}:`, item);
    //     });
    // }, [arrayOfDevices]);



    return (
        <Paper elevation={10} className={classes.root}>
            { arrayOfDevices.map((device, index) => (
                <Device key={index} data={device}/>
            ))}
        </Paper>
    )
}

export default DeviceList