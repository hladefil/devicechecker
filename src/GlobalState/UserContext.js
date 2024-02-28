import React from 'react';

const userContext = React.createContext({
    token: null,
    user: () => {
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