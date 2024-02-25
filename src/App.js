import './App.css';
import {userContext} from './GlobalState/UserContext';
import Login from "./Authentication/Login";
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from "react";
import DeviceList from "./Devices/DeviceList"


function App() {


    const [loggedIn, setLoggedIn] = useState(false);

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("all");
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setLoggedIn(true);
    }
    const logout = () => {
        setLoggedIn(false);
    }

    const id = (value) => {
        setUserId(value);
    }

    const name = (value) => {
        setUserName(value);
    }


    const email = (value) => {
        setUserEmail(value);
    }

    const role = (value) => {
        setUserRole(value);
    }

    const token = (value) => {
        setUserToken(value);
    }

    const getId = () => {
        return userId
    }

    const getName = () => {
        return userName
    }

    const getEmail = () => {
        return userEmail
    }

    const getRole = () => {
        if (userRole == null)
            return "all"
        return userRole
    }

    const getToken = () => {
        return userToken
    }

    useEffect(() => {
        console.log(userRole)
    }, [userRole]);

    // function renderSwitch() {
    //     switch (role) {
    //         case "admin":
    //             return <>
    //                 <Route exact path="/" component={Login}/>
    //             </>
    //         case "user":
    //             return <>
    //                 <Route exact path="/" component={Login}/>
    //             </>
    //         default:
    //             return;
    //     }
    // }



    return (
        <div className="App">
            <div className="bg"/>

            <div className="star-field">
                <div className="layer"/>
                <div className="layer"/>
                <div className="layer"/>
                <div className="layer"/>
            </div>
            <main>
                <userContext.Provider value={{
                    isLoggedIn: loggedIn,
                    login: login,
                    logout: logout,
                    id: id,
                    name: name,
                    email: email,
                    role: role,
                    token: token,

                    getId: getId,
                    getName: getName,
                    getRole: getRole,
                    getEmail: getEmail,
                    getToken: getToken


                }}>
                    <Router>
                        <Routes>
                            {/*{renderSwitch()}*/}
                            <Route path="/" element={<Login/>}/>
                            <Route path="/devices" element={<DeviceList/>}/>
                        </Routes>
                    </Router>
                </userContext.Provider>


            </main>

        </div>
    );
}

export default App;
