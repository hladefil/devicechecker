import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom";
import {Typography, Grid, Paper, Icon, IconButton, InputAdornment, Box, CssBaseline, Button, TextField, Container} from '@mui/material/';
import {Error, MailOutlined, Visibility, VisibilityOff,} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import {userContext} from "../GlobalState/UserContext";
import "./Login.css"
import honza from "../Images/honza.png"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        "&&": {
            marginTop: "3em",
            backgroundColor: "black",
            color: "white",
            '&:hover': {
                color: "white",
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
        }
    },
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: "100%",
    },
    done: {
        backgroundColor: "whitesmoke",
        padding: theme.spacing(2),
        borderRadius: 25,
        margin: theme.spacing(2),
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
}));


function Login() {
    const classes = useStyles();
    const context = useContext(userContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [syntaxError, setSyntaxError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    function HandleSubmit() {

        const requestBody = {
            login: email,
            password: password
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        };
        const url = "https://js-test-api.etnetera.cz/api/v1/login"
        fetch(url, requestOptions)
            .then(response => {
                if (response.status === 200) setSyntaxError(false)
                else setSyntaxError(true);
                return response.json()
            }).then(data => {

            context.id(data.id)
            context.name(data.name)
            context.email(email)
            context.role(data.type)
            context.token(data.token)

            navigate('/devices');

        })

    }


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleKeypress = e => {
        if (e.keyCode === 13) {
            HandleSubmit();
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{
            height: "100vh",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <CssBaseline/>

            <div className="flier">
                <img src={honza} alt="Girl in a jacket" width="250" height="300"/>
            </div>
            
            <Box variant="outlined" className={classes.paper}>
                <div style={{textAlign: "center"}}>
                    <Typography style={{color: "white"}} component="h1" variant="h2">
                        Přihlášení
                    </Typography>
                    <Typography style={{marginTop: "1em", color: "white"}}>
                        Přihlaste se a začněte využívat Device Checker
                    </Typography>
                </div>

                <div className={classes.root}>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    onKeyDown={handleKeypress}
                                    required
                                    fullWidth
                                    autoFocus
                                    id="email"
                                    label="Emailová adresa"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                        endAdornment: <InputAdornment position="end" className={classes.endAdornment}>
                                            <Icon style={{marginRight: "12px"}}>
                                                <MailOutlined/>
                                            </Icon>
                                        </InputAdornment>,
                                    }}

                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    color="primary"
                                    fullWidth
                                    onKeyDown={handleKeypress}
                                    name="password"
                                    label="Heslo"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        style: {backgroundColor: 'rgb(232, 240, 254)',},
                                        endAdornment: <InputAdornment position="end">
                                            {/*<LockOutlined/>*/}
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                style={{color: "black"}}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="reset"
                            fullWidth
                            variant="contained"
                            size="large"
                            // style={{ marginTop: "3em",
                            //     backgroundColor: "black",
                            //     color: "white", '&:hover': {
                            //         color: "white",
                            //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            //     },}}
                            className={classes.submit}
                            onClick={HandleSubmit}
                        >
                            Přihlásit se
                        </Button>
                    </form>
                </div>
            </Box>

            {syntaxError &&
                <Paper variant="outlined" className={classes.done} data-aos="fade-up">
                    <div className={classes.centerDone}>
                        <Typography variant="subtitle1" align="center">
                            Neplatné přihlašovací údaje
                        </Typography>
                        <Icon className={classes.iconDone}>
                            <Error/>
                        </Icon>
                    </div>
                </Paper>
            }
        </Container>


    );
}

export default Login