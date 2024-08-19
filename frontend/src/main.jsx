import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes,BrowserRouter} from "react-router-dom"
import Layout from './Layout/Layout'
import Home from './Home/Home'
import "./index.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
