import React, {useContext, useEffect, useState} from "react"
import {Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";
import NoImage from "../Images/No-Image-Placeholder.svg.png"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "20%",
        height: "45%",
        backgroundColor: "red"
    },
    detailContainer:{
        marginTop: "2em",
        marginBottom: "2em",
        width: "100%",
        height: "100%",
        backgroundColor: "blue"
    },

    deviceImages: {
        width: "40%",
        backgroundColor: "transparent"
    },

    headline: {
        // display: "flex",
        // flexDirection: "column",
        // backgroundColor: "orange",
        // width: "100%",
        // height: "100%"
    },
}))

function Device({data}) {

    const classes = useStyles()
    const context = useContext(userContext);

    const [deviceSpecs, setDeviceSpecs] = useState();


    useEffect(() => {
        console.log(data.image)
        setDeviceSpecs(data)
    }, []);

    return (
        <Paper elevation={10} className={classes.root}>
            <img src={(data.image !== undefined) ? data.image : NoImage} className={classes.deviceImages} alt="device image"/>
            <div className={classes.detailContainer}>
                {/*<h3> {data.vendor + " " + data.model} </h3>*/}

                <div className={classes.headline}>
                    <h3 style={{backgroundColor: "green"}}> {data.vendor} </h3>
                    <h4 style={{backgroundColor: "limegreen"}}> {data.model} </h4>
                </div>

                <p> {data.model} </p>
                <p> {data.model} </p>
                <p> {data.os} </p>
                <p> BORROWED </p>
            </div>
        </Paper>
    )
}

export default Device