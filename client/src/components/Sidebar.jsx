import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe, LogOut, initState } from "../features/authSlice"
import { AiFillAppstore, AiFillHome, AiOutlineLogout } from "react-icons/ai"
import { FaHospitalAlt } from "react-icons/fa"
import "../assets/scss/Hospital.scss"

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      <div className="profile d-flex flex-lg-row flex-column align-items-center justify-content-center">
        <p className="username">{user?.name}</p>
      </div>
      <ul className="nav flex-column align-content-center">
        <li className="nav-item mb-3">
          <Link className="nav-link" to="/dashboard">
            <span className="icon">
              <AiFillAppstore />
            </span>
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link" to="/hospital">
            <span className="icon">
              <FaHospitalAlt />
            </span>
            Hospitals
          </Link>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link" style={{cursor:'pointer'}} onClick={logout}>
            <span className="icon">
              <AiOutlineLogout />
            </span>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Dashboard
