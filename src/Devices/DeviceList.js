import React, {useContext, useEffect, useState} from "react"
import {Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";
import Device from "./Device"
import NoImage from "../Images/No-Image-Placeholder.svg.png";
import {Button, Checkbox, Fade, MenuItem, Select} from '@mui/material';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "3em",
        gap: "2em",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0)',
        overflowX: "hidden"

    },
    header: {
        position: "sticky",
        top: "0",
        zIndex: "10",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'rgba(255, 255, 255, 0)',
        height: "12vh",
        padding: "3vh",
        // gap: "25vw",

    },
    headerScroll: {
        backgroundColor: "blue"
    },
    headerText: {
        color: "white",
    },
    deviceImages: {
        width: "15%"
    }
}))

function DeviceList() {
    const classes = useStyles()
    const context = useContext(userContext);

    const [arrayOfDevices, setArrayOfDevices] = useState([]);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
            // Check the scroll position and update state accordingly
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        // Attach the event listener to the scroll event
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const token = context.getToken()
        // console.log(token)

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

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
            <div style={{transition: 'background-color 0.5s ease', backgroundColor: isScrolled && 'black'}}
                 className={classes.header}>
                <img
                    src="https://assets-global.website-files.com/620da74f58a6ca7904e121c0/6336ab8d8c45f51bfe189cf0_etnetera-core-white.svg"
                    className={classes.deviceImages}
                    alt="header-logo"/>
                <Typography variant="h6" className={classes.headerText}>ODHLÁSIT SE</Typography>
            </div>

            <div>
                <Select
                    style={{
                        marginTop: 35,
                        width: 250,
                        height: 50,
                        backgroundColor: "white",
                    }}

                    label="Výrobce"
                >
                    <MenuItem value={1}>Iphone</MenuItem>
                    <MenuItem value={2}>Samsung</MenuItem>
                    <MenuItem value={3}>Huawei</MenuItem>
                </Select>

                <Select
                    style={{
                        marginTop: 35,
                        width: 250,
                        height: 50,
                        backgroundColor: "white",
                        color: "white"
                    }}
                    label="Operační systém"
                >
                    <MenuItem value={1}>iOS</MenuItem>
                    <MenuItem value={2}>Androidd</MenuItem>
                </Select >

                <Checkbox {...label} defaultChecked />
            </div>

            <Paper className={classes.root}>
                {arrayOfDevices.map((device, index) => (
                    <Device key={index} data={device}/>
                ))}
            </Paper>
        </>
    )
}

export default DeviceList