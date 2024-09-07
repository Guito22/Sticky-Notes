import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes,BrowserRouter} from "react-router-dom"
import "./index.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import UserView from './UserView/UserView'
import Home from './Home/Home';
import Layout from './Layout/Layout';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import Edit from './Authentication/Edit';
import ErrorPage from './ErrorPage';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>

      <Route path='/' element={<Layout/>}>
        
        <Route index element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>

      </Route>

      <Route path='/user/:id' element={<UserView/>}></Route>
      
    </Routes>
  </BrowserRouter>
)
