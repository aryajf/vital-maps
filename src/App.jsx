import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import './assets/scss/App.scss'

function App(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    )
}

export default App;