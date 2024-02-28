import React from 'react';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import {userContext} from './GlobalState/UserContext';
import Login from "./Authentication/Login";
import DeviceList from "./Devices/DeviceList"
import CreateDeviceForm from "./Devices/CreateDeviceForm";

function App() {

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("all");
    const [userToken, setUserToken] = useState(null);


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
        const storedRole = sessionStorage.getItem('userRole');

        if (userRole == null && !storedRole)
            return "all"
        if (storedRole)
            return storedRole
        return userRole
    }

    const getToken = () => {
        return userToken
    }

    useEffect(() => {
        const storedName = sessionStorage.getItem('userName');
        const storedToken = sessionStorage.getItem('userToken');
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedRole = sessionStorage.getItem('userRole');

        if (storedName !== undefined) setUserName(storedName)
        if (storedToken !== undefined) setUserToken(storedToken)
        if (storedEmail !== undefined) setUserEmail(storedEmail)
        if (storedRole !== undefined) setUserRole(storedRole)
        else setUserRole("all")
    }, []);

    function renderSwitch() {
        switch (getRole()) {
            case "admin":
                return <>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/devices" element={<DeviceList/>}/> :
                    <Route path="/createdevice" element={<CreateDeviceForm/>}/> :
                    <Route path="*" element={<Navigate to="/"/>}/>
                </>
            case "user":
                return <>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/devices" element={<DeviceList/>}/> :
                    <Route path="*" element={<Navigate to="/"/>}/>
                </>
            case "all":
                return <>
                    <Route path="/" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </>
            default:
                return;

        }
    }


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
                            {renderSwitch()}
                        </Routes>
                    </Router>
                </userContext.Provider>

            </main>
        </div>
    );
}

export default App;
