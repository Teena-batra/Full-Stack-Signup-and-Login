import React from 'react'
import Login from "./Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './SignUp';
import Home from "./Home"
import PaymentSuccess from "./PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/paymentsuccess' element={<PaymentSuccess />}></Route>
        </Routes>
      
    </BrowserRouter>
  )
}

export default App
