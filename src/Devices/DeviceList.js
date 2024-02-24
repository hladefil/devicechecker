import React, {useContext, useEffect} from "react"
import {Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: "3em",
            marginRight: "3em",
            padding: "3em",
            backgroundColor: "transparent",
        },
        backgroundColor: "#e6f4f3",
        height: "88vh",
        marginLeft: "0.5em",
        marginRight: "0.5em",
        padding: "1em",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        verticalAlign: "center"
    },
    temporaryFun: {
        marginTop: "30vh",
        color: "white",
    },
}))

function DeviceList() {
    const classes = useStyles()
    const context = useContext(userContext);

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
                console.log(data);
                // setData(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
       /* Aos.init({
            duration: 2000
        });*/
    }, []);

    return (
        <Paper elevation={10} className={classes.root}>
            <p>kokot</p>
        </Paper>
    )
}

export default DeviceList