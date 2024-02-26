import React, {useContext, useEffect, useRef, useState} from "react"
import {userContext} from "../GlobalState/UserContext";
import {useNavigate} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Paper, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
    Error,
    Fingerprint,
    Group,
    History, Image,
    MailOutlined, Settings,
    Smartphone,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "black",
        color: "white",
        '&:hover': {
            color: "white",
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    },
    done: {
        backgroundColor: "whitesmoke",
        padding: theme.spacing(1),
        borderRadius: 25,
        margin: theme.spacing(1),
    },
    centerDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    iconDone: {
        marginLeft: theme.spacing(2),
    },


    container: {
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },
    mainBox: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: "100%",
    },
    root: {
        marginTop: theme.spacing(2),
    },
    form: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
        //width: '100%',
        // marginTop: theme.spacing(2),
    },
    textField: {
        width: '70%'
    }
}));

function CreateDeviceForm() {

    const classes = useStyles();
    const context = useContext(userContext);
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [vendor, setVendor] = useState("");
    const [model, setModel] = useState("");
    const [os, setOS] = useState("");
    const [osVersion, setOSVersion] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [errorOccurenceMessage, setErrorOccurenceMessage] = useState(false);
    const [succesCreationMessage, setSuccesCreationMessage] = useState(false);


    const [focusTextFieldHandler, setFocusTextFieldHandler] = useState(false);


    function HandleSubmit() {

        const token = context.getToken()

        if (token !== null && id && os && vendor && model && osVersion) {
            console.log("JSEM INSIDE")
            const requestBody = {
                code: id,
                os: os,
                vendor: vendor,
                model: model,
                osVersion: osVersion,
                image: imageURL,
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify(requestBody)
            };

            const url = "https://js-test-api.etnetera.cz/api/v1/phones"
            fetch(url, requestOptions)
                .then(response => {
                    if (response.status === 201) {
                        setErrorOccurenceMessage(false)
                        setSuccesCreationMessage(true)

                    } else {
                        setErrorOccurenceMessage(true);
                        setSuccesCreationMessage(false)
                    }
                    return response.json()
                }).then(data => {
                console.log(data)
            })

            //context.user(data)

            // context.id(data.id)
            // context.name(data.name)
            // context.email(email)
            // context.role(data.type)
            // context.token(data.token)

            setTimeout(() => {
                // Replace '/your-target-route' with the route you want to navigate to
                navigate('/devices');
            }, 3000); // 1000 milliseconds (1 second)

        } else {
            console.log("JSEM OUTSIDE")
            setErrorOccurenceMessage(true)
        }

    }


    const handleKeypress = e => {
        if (e.keyCode === 13) {
            HandleSubmit();
        }
    };

// const MyTextField = ({value, label, onChangeHandler, icon}) =>{
//
//    // let inputRef = useRef(false);
//     const [inputRef, setInputRef] = useState(false);
//
//     const handleTextFieldChange = (event) => {
//         if (onChangeHandler) {
//             onChangeHandler(event.target.value);
//         }
//     };
//
//
//     const handleFocus = () => {
//         setFocusTextFieldHandler(!focusTextFieldHandler)
//         setInputRef(true)
//     };
//
//     useEffect(() => {
//         console.log("menim se")
//         if(inputRef){
//             setInputRef(false)
//         }
//     }, [inputRef]);
//
//     return(
//         <TextField
//             variant="filled"
//             onKeyDown={handleKeypress}
//             required
//             fullWidth
//             autoFocus={inputRef}
//             label={label}
//             value={value}
//             onChange={handleTextFieldChange}
//             onClick={handleFocus}
//             name="vendor"
//             InputProps={{
//                 style: {backgroundColor: 'rgb(232, 240, 254)',},
//                 endAdornment: <InputAdornment position="end" className={classes.endAdornment}>
//                     <Icon style={{marginRight: "12px"}}>
//                         {icon}
//                     </Icon>
//                 </InputAdornment>,
//             }}
//
//         />
//     )
// }

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>

            <Box variant="outlined" className={classes.mainBox}>
                <Typography style={{color: "white", textAlign: "center"}} variant="h2">
                    Nové zařízení
                </Typography>

                <div className={classes.root}>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/*<MyTextField value={id} label="Kódové označení (identifikátor)" onChangeHandler={setId} icon={<Fingerprint/>}/>*/}

                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    autoFocus
                                    className={classes.textField}
                                    id="id"
                                    label="Kódové označení"
                                    value={id}
                                    onChange={(event) => setId(event.target.value)}
                                    name="id"
                                    autoComplete="id"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',}
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    autoFocus
                                    className={classes.textField}

                                    id="vendor"
                                    label="Výrobce"
                                    value={vendor}
                                    onChange={(event) => setVendor(event.target.value)}
                                    name="vendor"
                                    autoComplete="vendor"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    autoFocus
                                    className={classes.textField}

                                    style={{margin: "0"}}
                                    label="Model"
                                    value={model}
                                    onChange={(event) => setModel(event.target.value)}
                                    name="model"
                                    autoComplete="model"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    autoFocus
                                    className={classes.textField}

                                    id="os"
                                    label="Operační systém"
                                    value={os}
                                    onChange={(event) => setOS(event.target.value)}
                                    name="os"
                                    autoComplete="os"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    className={classes.textField}
                                    autoFocus
                                    id="osVersion"
                                    label="Verze operačního systému"
                                    value={osVersion}
                                    onChange={(event) => setOSVersion(event.target.value)}
                                    name="osVersion"
                                    autoComplete="osVersion"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    autoFocus
                                    className={classes.textField}

                                    id="image"
                                    label="Obrázek (URL)"
                                    value={imageURL}
                                    onChange={(event) => setImageURL(event.target.value)}
                                    name="image"
                                    autoComplete="image"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',}
                                    }}
                                />
                            </Grid>

                            <Button
                                type="reset"
                                fullWidth
                                variant="contained"
                                size="large"
                                className={classes.submit}
                                onClick={HandleSubmit}
                            >
                                PŘIDAT
                            </Button>

                        </Grid>
                        {errorOccurenceMessage ?
                            <Paper variant="outlined" className={classes.done} data-aos="fade-up">
                                <div className={classes.centerDone}>
                                    <Typography variant="subtitle1" align="center">
                                        Nesprávně vyplněné pole
                                    </Typography>
                                    <Icon className={classes.iconDone}>
                                        <Error/>
                                    </Icon>
                                </div>
                            </Paper>
                            : ""
                        }
                        {succesCreationMessage ?
                            <Paper variant="outlined" className={classes.done} data-aos="fade-up">
                                <div className={classes.centerDone}>
                                    <Typography variant="subtitle1" align="center">
                                        Zařízení bylo úspěšně přidáno
                                    </Typography>
                                    <Icon className={classes.iconDone}>
                                        <Error/>
                                    </Icon>
                                </div>
                            </Paper>
                            : ""
                        }
                    </form>
                </div>
            </Box>

        </Container>


    );
}

export default CreateDeviceForm