import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { handleDelete } from '../contexts/handleDelete';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  // we will store the user data in this array to display it in the homepage.
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const deleteSetup = async (e, userId) => {
    e.preventDefault();
    try {
      await handleDelete(userId);
      setUsers(users.filter((user) => user._id !== userId));
    }
    catch(err) {
      console.log("Error occurred while deleting the user." , err);
    }
  }

  // Remember that you cannot use useNavigate() inside a function, so if you want to.... you can 
  // use it inside a function like this. Here we are calling useNavigate() which is not inside a function.

  const getLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  useEffect(() => {
    axios.get("/")
      .then((response) => { setUsers(response.data); })
      .catch((err) => { console.log("There was some error while fetching the data ") });
  }, []);

  return (
    <div>
      <h1>Hello This is home page</h1>
      {users.map((user, index) => {

        return <li key={index}>
          Email : {user.email} <br></br>
          Password : {user.password}
          <form action='' onSubmit={(e) => deleteSetup(e, user._id)}>
            <button key={index} >delete</button>
          </form>
        </li>
      })}
      <br></br> <br></br>

      <form action="/login" onSubmit={getLogin}>
        <button>Login</button>
      </form>

    </div>
  )
}
