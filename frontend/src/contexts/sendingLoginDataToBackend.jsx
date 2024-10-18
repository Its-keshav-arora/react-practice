import React, { createContext } from 'react';
import axios from 'axios';

// We will include login form data details in this context and will send it to the backend.
export const loginContext = createContext();

const client = axios.create({
    baseURL: 'https://react-practice-seven-virid.vercel.app',
});


export const SendingLoginDataToBackend = (email, password) => {
    // console.log("Sending login post request from the frontEnd Side");
    return client.post('/login', {
        email: email,
        password: password,
    }).then((res) => {
        if (res.status === 200) {
            // console.log("Login Successful from the backend Side");
            return res.data;
        }
        else {
            console.log("login failed");
            throw new Error("login failed");
        }
    }).catch((err) => {
        console.log("Error occurred : ", err);
        throw err;
    })};