import React from 'react'
import Navbar from './Components/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './elements/Home'
import About from './elements/About'
import Contact from './elements/Contact'
import Signin from './elements/Signin'
import Signup from './elements/Signup'

function App() {
  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signUp" element={<Signup/>}  />
        <Route path="/signIn" element={<Signin/>}/>
      </Routes>
    </div>
  )
}

export default App
