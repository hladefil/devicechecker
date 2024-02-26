import './App.css';
import {userContext} from './GlobalState/UserContext';
import Login from "./Authentication/Login";
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from "react";
import DeviceList from "./Devices/DeviceList"
import CreateDeviceForm from "./Devices/CreateDeviceForm";


function App() {


    const [loggedIn, setLoggedIn] = useState(false);

    const [userObject, setUserObject] = useState();
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

    const user = (value) => {
        setUserObject(value);
    }

    const id = (value) => {
        setUserId(value);
    }

    const name = (value) => {
        setUserName(value);
        sessionStorage.setItem('userName', value);
    }


    const email = (value) => {
        setUserEmail(value);
        sessionStorage.setItem('userEmail', value);

    }

    const role = (value) => {
        setUserRole(value);
        sessionStorage.setItem('userRole', value);

    }

    const token = (value) => {
        setUserToken(value);
        sessionStorage.setItem('userToken', value);
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

    const getUser = () => {
        return userObject
    }

    // useEffect(() => {
    //     console.log(userObject)
    // }, [userObject]);

    useEffect(() => {
        const storedName = sessionStorage.getItem('userName');
        const storedToken = sessionStorage.getItem('userToken');
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedRole = sessionStorage.getItem('userRole');

        if(userName !== undefined) setUserName(userName)
        if(storedToken !== undefined) {
            console.log(storedToken)
            setUserToken(storedToken)
        }
        if(storedEmail !== undefined) setUserEmail(storedEmail)
        if(storedRole !== undefined) setUserName(storedRole)
    }, []);

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
                    user: user,

                    getUser: getUser,
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
                            <Route path="/createdevice" element={<CreateDeviceForm/>}/>

                        </Routes>
                    </Router>
                </userContext.Provider>


            </main>

        </div>
    );
}

export default App;
