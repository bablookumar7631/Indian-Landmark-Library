import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'react-hot-toast';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Monument from './Components/Monument/Monument.jsx'
import DetailPage from './Components/DetailPage/DetailPage.jsx'
import Login from './Components/SignupLogin/Login.jsx'
import Signup from './Components/SignupLogin/Signup.jsx'
import ChangePassword from './Components/SignupLogin/ChangePassword.jsx';
import ForgetPassword from './Components/SignupLogin/ForgetPassword.jsx';
import SetNewPassword from './Components/SignupLogin/SetNewPassword.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='monument' element={<Monument/>}/>
      <Route path='monumentdetailPage/:id' element={<DetailPage/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='change-password' element={<ChangePassword/>}/>
      <Route path='forget-Password' element={<ForgetPassword/>}/>
      <Route path='/reset-password/:uidb64/:token' element={<SetNewPassword/>}/>
    </Route>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster/>
  </React.StrictMode>,
)
