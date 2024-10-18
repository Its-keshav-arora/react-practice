import React from 'react'
import { useState } from 'react'
import { SendingLoginDataToBackend } from '../contexts/sendingLoginDataToBackend';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // This I will use to display erorr messages.
    const navigate = useNavigate(); // This we will use to redirect to different routes.
    const loginSetup = async (e) => {
        e.preventDefault();
        try {
          const response = await SendingLoginDataToBackend(email, password);
          setMessage(response);
          navigate('/');
        }
        catch(error) {
          setMessage(error.response ? error.response.data : "An error occurred");
        }
    }

  return (
    <div>
        <form action="">
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Enter your email" /> <br></br>
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Enter your password" /> <br></br>
            <button onClick={loginSetup} type="submit">Login</button>
        </form>
        {message && <p style={{color:"red"}}>{message}</p>}
    </div>
  )
}
