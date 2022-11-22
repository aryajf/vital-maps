import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import logo from "../assets/images/logo.png"
import '../assets/scss/Navbar.scss'

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false)
  const [button, setButton] = useState(true)
  const { user } = useSelector((state) => state.auth)

  const toggleMenu = () => {
    setIsMenuToggled(!isMenuToggled)
  }

  const closeMobileMenu = () => {
    setIsMenuToggled(false)
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  return (
    <>
      <nav className="navbar navbar-dark">
        <Link to="/">
          <img src={logo} width={100} height={50} alt="Logo Vital Maps" />
        </Link>
        <img className="divider" src="./Assets/Images/Vector 1.png" alt="" />
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="modal" data-bs-target="#targetModal-item">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-container">
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={isMenuToggled ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={isMenuToggled ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maps" className="nav-links" onClick={closeMobileMenu}>
                Maps
              </Link>
            </li>
            <li className="nav-item">
              {
                user ? (
                  <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                    Login
                  </Link>
                )
              }
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
