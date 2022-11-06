import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../assets/scss/Home.scss'

function Navbar() {
  return (
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/maps'>Maps</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    </div>
  );
}

export default Navbar;