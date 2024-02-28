import React, {useContext, useEffect, useState} from "react"
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import {Box, Typography, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {userContext} from "../GlobalState/UserContext";
import NoImage from "../Images/No-Image-Placeholder.svg.png"


const useStyles = makeStyles(theme => ({
    media: {
        height: 200, // Default height for smaller devices

        [theme.breakpoints.up('lg')]: {
            height: 200, // Height for devices with screen width >= 1280px
        },
        [theme.breakpoints.up('xl')]: {
            height: 300, // Height for devices with screen width >= 1920px
        },
    },
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: "160%",
        backgroundColor: "white",
    },
    detailContainer: {
        marginTop: "2em",
        marginBottom: "2em",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    },

    deviceImages: {
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
    HandlingButton:{
        [theme.breakpoints.up('lg')]: {
            marginTop: "3em",
            width: "90%"
        },
        [theme.breakpoints.up('xl')]: {
            marginTop: "0",
            width: "50%",
        },
    }
}))

function Device({data}) {

    const classes = useStyles()
    const context = useContext(userContext);

    const [bookIsBorrowed, setBookIsBorrowed] = useState(false);
    const [returnOptionButton, setReturnOptionButton] = useState(false);
    const [borrowerName, setBorrowerName] = useState("");
    const [borrowDate, setBorrowDate] = useState("");


    const loadBorrowedDevices = () => {
        const token = context.getToken()
        const id = data.id

        if (token !== null && id) {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
            };

            const url = "https://js-test-api.etnetera.cz/api/v1/phones/" + encodeURIComponent(id)
            fetch(url, requestOptions)
                .then(response => {
                    return response.json()
                }).then(data => {
                if (data.borrowed) {
                    let username = data.borrowed.user.name;
                    if (username === context.getName()) {
                        // eslint-disable-next-line no-useless-concat
                        setBorrowerName("Vámi" + ", ")
                        setReturnOptionButton(true)
                    } else setBorrowerName(username + ", ")

                    const timestamp = data.borrowed.date;
                    const date = new Date(timestamp);

                    const day = ('0' + date.getDate()).slice(-2);
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
                    const year = date.getFullYear();
                    const hours = ('0' + date.getHours()).slice(-2);
                    const minutes = ('0' + date.getMinutes()).slice(-2);

                    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
                    setBorrowDate(formattedDate)
                    setBookIsBorrowed(true)
                }
            }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        }
    }
    useEffect(() => {
        loadBorrowedDevices()
    }, []);

    const handleBorrowButton = () => {

        const token = context.getToken()
        const id = data.id

        if (token !== null && id) {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                }
            };

            const url = "https://js-test-api.etnetera.cz/api/v1/phones/" + encodeURIComponent(id) + "/borrow"
            fetch(url, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        setBookIsBorrowed(true)
                        loadBorrowedDevices()

                    }
                    return response.json()
                }).then(data => {
            }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        }
    };

    const handleReturnButton = () => {

        const token = context.getToken()
        const id = data.id

        if (token !== null && id) {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                }
            };

            const url = "https://js-test-api.etnetera.cz/api/v1/phones/" + encodeURIComponent(id) + "/return"
            fetch(url, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        setBookIsBorrowed(false)
                        setReturnOptionButton(false)
                        loadBorrowedDevices()
                    }
                    return response.json()
                }).then(data => {
            }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        }
    };

    return (
        <Card elevation={10} className={classes.root}>
            <Grid container>
                <Grid item xs={5}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="300"
                        image={(data.image !== undefined) ? data.image : NoImage}
                        className={`${classes.deviceImages} ${classes.media}`}
                    />
                </Grid>
                <Grid item xs={7}>
                    <CardContent sx={{display: "flex", flexDirection: "column"}}>
                        <div style={{height: "8em"}}>
                            <Typography component="div" variant="h5">
                                {data.model}
                            </Typography>
                            <Typography sx={{marginTop: "20em"}} variant="subtitle1" component="p">
                                {data.vendor}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                {data.os} / {data.osVersion}
                            </Typography>
                        </div>

                        <Box style={{marginTop: "1m"}}>
                            <Typography style={{
                                height: "1.5em",
                                marginBottom: "1.7em",
                                backgroundColor: bookIsBorrowed ? "whitesmoke" : "white"
                            }} variant="caption" component="p">

                                {bookIsBorrowed ? "Vypůjčeno: " + borrowerName + "\n" + borrowDate : ""}
                            </Typography>
                            <Button
                                disabled={bookIsBorrowed && !returnOptionButton}
                                variant="contained"
                                size="small"
                                className={classes.HandlingButton}
                                style={{
                                    height: "35%",
                                    color: bookIsBorrowed && !returnOptionButton ? "whitesmoke" : "white",
                                    backgroundColor: bookIsBorrowed && !returnOptionButton ? "grey" : "black"
                                }}
                                onClick={returnOptionButton ? handleReturnButton : handleBorrowButton}
                            >
                                {returnOptionButton ? "VRÁTIT" : "PŮJČIT"}
                            </Button>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Device