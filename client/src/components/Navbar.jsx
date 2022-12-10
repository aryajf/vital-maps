import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

import divider from '../assets/images/vector-1.png';
import '../assets/scss/Navbar.scss';
import { LogOut, initState } from '../features/authSlice';
import { AiFillAppstore, AiFillHome, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { FaMapMarkedAlt } from 'react-icons/fa';

import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [navState, setNavState] = useState(false);
  const closeMobileMenu = () => {
    setIsMenuToggled(false);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(initState());
    navigate('/');
  };

  return (
    <nav>
      <div className="brand-container">
        <div className="brand">
          <Link to="/">
            <img src={logo} width={100} height={50} padding={10} alt="Logo Vital Maps" />
          </Link>
        </div>
        <div className="toggle-container">
          <div className="toggle">{navState ? <MdClose onClick={() => setNavState(false)} /> : <GiHamburgerMenu onClick={() => setNavState(true)} />}</div>
        </div>
      </div>
      <div className={`links-container ${navState ? 'nav-visible' : ''}`}>
        <ul className="links">
          <li>
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              <AiFillHome className="me-1 mb-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/maps" className="nav-links" onClick={closeMobileMenu}>
              <FaMapMarkedAlt className="mb-1 me-1" /> Maps
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                  <AiFillAppstore className="mb-1 me-1" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={logout}>
                  <AiOutlineLogout className="me-1 mb-1" /> Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                <AiOutlineLogin className="me-1 mb-1" /> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
