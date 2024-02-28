import React, {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {IconButton, Typography, Button} from '@mui/material/';
import {FormControl, InputLabel, MenuItem, Container, Select, Grid} from '@mui/material';
import {Clear} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import {userContext} from "../GlobalState/UserContext";
import Device from "./Device"


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
        [theme.breakpoints.up('md')]: {
            height: "8vh",

        },
    },
    headerScroll: {
        backgroundColor: "blue",
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
        width: "15%",
        [theme.breakpoints.up('md')]: {
            width: "10%",

        },
    },
    controlSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "blue",
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

    },
    selectionField: {
        backgroundColor: "white",
        marginRight: "4em",
        width: "200px"
    },
    createDeviceButton: {
        "&&": {
            backgroundColor: "white",
            color: "black",
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
        }
    },
    clearButton: {
        "&&": {
            paddingLeft: "0.7em",
            paddingRight: "0.7em",
            backgroundColor: "white",
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',

            },
        }
    },
    mainBox: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        marginTop: "2em"
    }


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
        if (vendor !== "" || !vendor) setVendor("")
        if (oSystem !== "" || !oSystem) setOSystem("")
        if (vendor!== "" || oSystem !== "") setArrayOfDevices(originalArrayOfDevices)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        const token = context.getToken()
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
            <Container sx={{maxWidth: '80%'}} maxWidth={false}>
                <div className={classes.mainBox}>
                    <div style={{display: "flex", justifyContent: "flex-start", width: "80%"}}>

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
                    <div style={{display: "flex", justifyContent: "flex-end", width: "20%"}}>
                        {context.getRole() === "admin" && (
                            <Button type="reset"
                                    variant="contained"
                                    size="large"
                                    className={classes.createDeviceButton}
                                    onClick={handleCreateButtonClick}
                            >
                                PŘIDAT ZAŘÍZENÍ
                            </Button>
                        )}
                    </div>
                </div>
            </Container>
            <Container sx={{maxWidth: '80%'}} maxWidth={false} style={{marginTop: "2em"}}>
                <Grid container spacing={25} rowSpacing={0} columnSpacing={{xs: 2, sm: 2, md: 6}}>
                    {arrayOfDevices.map((device, index) => (
                        <Grid key={index} item xs={3}>
                            <Device key={index} data={device}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default DeviceList