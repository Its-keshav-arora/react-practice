import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'
import axios from 'axios'

// Now I don't need to define baseURL in each request, as I defined it in the main file.
axios.defaults.baseURL = 'http://localhost:8080'; 

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path='/login' element={<Login></Login>} ></Route>
      </Routes>
    </Router>
  )

}

export default App
