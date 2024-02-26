import React, {useContext, useEffect, useState} from "react"
import {Divider, IconButton, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {userContext} from "../GlobalState/UserContext";
import Device from "./Device"
import {FormControl, InputLabel, MenuItem} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Clear} from "@material-ui/icons";
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "1.5em",
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
    logoutText: {
        color: "white",
        '&:hover': {
            cursor: "pointer",
            color: 'rgba(255, 255, 255, 0.7)',
        },
    },
    loggedEmail: {
        color: "white",
    },

    deviceImages: {
        width: "15%"
    },
    controlSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "85vw",
        marginLeft: "6.5em"
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2em",
        padding: "1.5em",
        width: "35vw",
    },
    selectionField: {
        backgroundColor: "white",
        width: "200px"
    },
    createDeviceButton: {
        backgroundColor: "white",
        color: "black",
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
    },
    clearButton: {
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',

        },
    },


}))

function DeviceList() {
    const classes = useStyles()
    const context = useContext(userContext);
    const navigate = useNavigate();

    const [arrayOfDevices, setArrayOfDevices] = useState([]);

    const [isScrolled, setIsScrolled] = useState(false);

    const [vendor, setVendor] = React.useState('');
    const [vendorList, setVendorList] = React.useState([]);

    const [oSystem, setOSystem] = React.useState('');
    const [oSystemList, setOSystemList] = React.useState([]);

    const [cannotUpdateCategories, setCannotUpdateCategories] = React.useState(false);

    const [originalArrayOfDevices, setOriginalArrayOfDevices] = React.useState([]);

    const handleChangeVendor = (event) => {
        setVendor(event.target.value);
        setCannotUpdateCategories(true)
        if (originalArrayOfDevices.length === 0) {
            setOriginalArrayOfDevices(arrayOfDevices)
            const filteredDevices = arrayOfDevices.filter(device => device.vendor === event.target.value);
            setArrayOfDevices(filteredDevices)
        } else {
            const tmpArray = originalArrayOfDevices
            const filteredDevices = tmpArray.filter(device => device.vendor === event.target.value);
            setArrayOfDevices(filteredDevices)
        }
    };

    const handleChangeOsSystem = (event) => {
        setOSystem(event.target.value);
        setCannotUpdateCategories(true)

        if (originalArrayOfDevices.length === 0) {
            setOriginalArrayOfDevices(arrayOfDevices)
            const filteredDevices = arrayOfDevices.filter(device => device.os === event.target.value);
            setArrayOfDevices(filteredDevices)
        } else {
            const tmpArray = originalArrayOfDevices
            const filteredDevices = tmpArray.filter(device => device.os === event.target.value);
            setArrayOfDevices(filteredDevices)
        }
    };

    const HandleClearSelections = () => {
        setVendor("")
        setOSystem("")
        setArrayOfDevices(originalArrayOfDevices)
    }

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
        //console.log("THIS IS TOKEN : " + token)
        if (token !== null) {

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
        }
    }, [context.token]);


    useEffect(() => {

        if (cannotUpdateCategories) {
            setCannotUpdateCategories(false)
            return;
        }

        const seenVendors = new Set();
        const seenOsSystems = new Set();

        arrayOfDevices.filter(obj => {
            if (!seenVendors.has(obj.vendor)) {
                seenVendors.add(obj.vendor);
                return true;
            }
            return false;
        });
        arrayOfDevices.filter(obj => {
            if (!seenOsSystems.has(obj.os)) {
                seenOsSystems.add(obj.os);
                return true;
            }
            return false;
        });

        setVendorList(Array.from(seenVendors));
        setOSystemList(Array.from(seenOsSystems));

    }, [arrayOfDevices]);

    // useEffect(() => {
    //     arrayOfDevices.forEach((item, index) => {
    //         console.log(`Object ${index + 1}:`, item);
    //     });
    // }, [arrayOfDevices]);

    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const handleLogoutCLick = () => {

        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userName');
        navigate('/');
    }

    const handleCreateButtonClick = () => {
        navigate('/createdevice');
    }

    return (
        <>
            <div style={{transition: 'background-color 0.5s ease', backgroundColor: isScrolled && 'black'}}
                 className={classes.header}>
                <img
                    src="https://assets-global.website-files.com/620da74f58a6ca7904e121c0/6336ab8d8c45f51bfe189cf0_etnetera-core-white.svg"
                    className={classes.deviceImages}
                    alt="header-logo"/>
                <div>
                    <Typography variant="caption" className={classes.loggedEmail}>
                        {context.getEmail()}
                    </Typography>
                    <Typography onClick={handleLogoutCLick} variant="h6" className={classes.logoutText}>
                        ODHLÁSIT SE
                    </Typography>
                </div>
            </div>
            <div className={classes.controlSection}>
                <div className={classes.filters}>
                    <FormControl variant="filled">
                        <InputLabel>Systém</InputLabel>
                        <Select
                            className={classes.selectionField}
                            value={oSystem || ''}
                            label="Systém"
                            onChange={handleChangeOsSystem}
                            style={{backgroundColor: 'white'}}

                        >
                            {oSystemList.map((item, index) => (
                                <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel>Výrobce</InputLabel>
                        <Select
                            value={vendor || ''}
                            label="Výrobce"
                            className={classes.selectionField}
                            onChange={handleChangeVendor}
                            style={{backgroundColor: 'white'}}
                        >
                            {vendorList.map((item, index) => (
                                <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <IconButton onClick={HandleClearSelections} className={classes.clearButton} color="primary">
                        <Clear/>
                    </IconButton>
                </div>

                {context.getRole() && (
                    <Button type="reset"
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.createDeviceButton}
                            onClick={handleCreateButtonClick}
                    >
                        PŘIDAT ZAŘÍZENÍ
                    </Button>
                )}
            </div>
            <div className={classes.root}>
                {arrayOfDevices.map((device, index) => (
                    <Device key={index} data={device}/>
                ))}
            </div>
        </>
    )
}

export default DeviceList