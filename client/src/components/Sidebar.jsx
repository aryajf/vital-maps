import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe, LogOut, initState } from "../features/authSlice"
import "../assets/scss/Hospital.scss"

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const homeIcon = '../assets/icons/home.png'
  const logoutIcon = '../assets/icons/arrow-logout.png'
  const dashboardIcon = '../assets/icons/dashboard.png'
  const avatarProfile = '../assets/images/avatar_profile.png'
  const { user, isError } = useSelector((state) => state.auth)

  const logout = () => {
    dispatch(LogOut())
    dispatch(initState())
    navigate("/")
  }

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      logout()
    }
  }, [isError])

  return (
    <nav className="sidebar" style={{zIndex: 1000}}>
      <div className="profile d-flex flex-lg-row flex-column align-items-center">
        <img
          style={{ marginRight: "0.75rem" }}
          src={avatarProfile}
          width={60}
          height={60}
          alt="Logo Vital Maps"
        />
        <p className="username">{user?.name}</p>
      </div>
      <ul className="nav flex-column align-content-center">
        <li className="nav-item mb-3">
          <Link className="nav-link" to="/dashboard">
            <span className="icon">
              <img
                src={dashboardIcon}
                width={20}
                height={20}
                alt=""
              />
            </span>
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link" to="/hospital">
            <span className="icon">
              <img
                src={homeIcon}
                width={20}
                height={20}
                alt=""
              />
            </span>
            Hospitals
          </Link>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link" style={{cursor:'pointer'}} onClick={logout}>
            <span className="icon">
              <img
                src={logoutIcon}
                width={20}
                height={20}
                alt=""
              />
            </span>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Dashboard
