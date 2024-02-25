import React, {useContext, useEffect, useState} from "react"
import {Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";
import NoImage from "../Images/No-Image-Placeholder.svg.png"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "20%",
        height: "45%",
        backgroundColor: "white"
    },
    detailContainer: {
        marginTop: "2em",
        marginBottom: "2em",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    },

    deviceImages: {
        width: "40%",
        backgroundColor: "transparent",
        marginLeft: "0.3em"
    },

    headline: {
        display: "flex",
        flexDirection: "column",
        marginTop: "1em",
        marginBottom: "1.5em",
        marginRight: "0.3em",
        height: "35%"
    },
}))

function Device({data}) {

    const classes = useStyles()
    const context = useContext(userContext);

    const [deviceSpecs, setDeviceSpecs] = useState();


    useEffect(() => {
        // console.log(data.image)
        setDeviceSpecs(data)
    }, []);

    return (
            <Paper elevation={10} className={classes.root}>
                <img src={(data.image !== undefined) ? data.image : NoImage} className={classes.deviceImages}
                     alt="device image"/>
                <div className={classes.detailContainer}>
                    <div className={classes.headline}>
                        <h4 style={{marginBottom: "0"}}> {data.model} </h4>
                        <p style={{fontSize: "80%", marginTop: "0.2em"}}> {data.vendor} </p>
                        <p style={{fontSize: "70%"}}> {data.os} / {data.osVersion}</p>

                    </div>
                    <Button
                        variant="contained"
                        size="small"
                        style={{marginRight: "0.3em", width: "80%", color: "white", backgroundColor: "black"}}
                    >
                        PŮJČIT
                    </Button>
                </div>
            </Paper>
    )
}

export default Device