import axios from 'axios'
import React from 'react'

export const handleDelete = async (userId) => {

    // console.log("Sending delete request to the backend side");
    // console.log('/user/' + userId);

    await axios.delete('/user/' + userId);
}

