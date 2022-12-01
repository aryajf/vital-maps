import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../features/authSlice'
import Logo from '../../assets/images/logo.png'
import '../../assets/scss/Login.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = (e) => {
    e.preventDefault()
    dispatch(LoginUser({ email, password }))
  }

  return (
    <div className="container">
      <div>
        <section className="signin h-100 w-100" style={{ boxSizing: 'border-box', background: 'radial-gradient(50% 48.63% at 50% 49.85%, #3D5AF1 0%, #003FCB 83.33%)' }}>
          <div className="content-3-5 d-flex flex-column align-items-center h-100 flex-lg-row">
            <div className="d-flex mx-auto align-items-left justify-content-center width-left mx-lg-0">
              <img className="logo" src={Logo} width={120} height={60} alt="Logo Vital Maps" />
              <div className="left mx-lg-0 mx-auto">
                <div className="align-items-center justify-content-left d-lg-none d-flex" style={{ marginBottom: '20px' }}>
                  <img className="img-fluid" src="./Assets/Images/3d-illustration-removebg-preview.png" width={350} height={370} alt="" />
                </div>
                <h3 className="title-text">Welcome back</h3>
                <p className="caption-text">Welcome back! Please enter your details.</p>
                <form onSubmit={Auth}>
                  {isError && <p className="alert alert-danger has-text-centered">{message}</p>}
                  <h1 className="title is-2">Sign In</h1>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
            <div className="position-relative d-none d-lg-block h-100 width-right">
              <img className="position-absolute img-fluid centered" src="./Assets/Images/3d-illustration-removebg-preview.png" width={350} height={370} alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login
