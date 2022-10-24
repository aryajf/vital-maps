import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../assets/scss/Home.scss'

function Navbar() {
  return (
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/error'>not found</Link></li>
        </ul>
    </div>
  );
}

export default Navbar;