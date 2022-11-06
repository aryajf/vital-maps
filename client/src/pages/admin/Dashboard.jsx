import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { LogOut, reset } from "../../features/authSlice";

const Dashboard = () => { 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isError} = useSelector((state => state.auth))

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate('/')
    }

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    
    useEffect(() => {
        if(isError){
            logout()
        }
    }, [isError])

    return (
        <>
            <div>
                <h1>Dashboard</h1>
                <h2>Hey You're finally awake, <strong>{user && user.name}</strong></h2>
            </div>
            <div><button onClick={logout}>Logout</button></div>
        </>
    );
};

export default Dashboard;
