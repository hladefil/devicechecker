import React from 'react';

const userContext = React.createContext({
    isLoggedIn: false,
    token: null,
    login: () => {
    },
    logout: () => {
    },
    id: (value) => {
    },
    name: (value) => {
    },
    email: (value) => {
    },
    role: (value) => {
    },

    getId: () => {
    },
    getName: () => {
    },
    getEmail: () => {
    },
    getRole: () => {
    },
    getToken: () => {
    },

});

export {userContext};