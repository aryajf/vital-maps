import React, {useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginUser, reset } from "../../features/authSlice"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    // dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="container">
      <div>
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
          <button type="submit" className="btn btn-primary mt-3">{isLoading ? "Loading..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
