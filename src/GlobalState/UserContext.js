import React from 'react';

const userContext = React.createContext({
    isLoggedIn: false,
    token: null,
    user: () => {
    },
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

    getUser: () => {
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