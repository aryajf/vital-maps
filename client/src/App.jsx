import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import Maps from "./pages/Maps";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import './assets/scss/App.scss'

function App(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    )
}

export default App;