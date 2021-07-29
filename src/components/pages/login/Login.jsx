import "./login.css";
import {Link}  from "react-router-dom";
import axios from "axios";
import {useState} from "react"; 
import { Context } from "../../../context/Context";
import { useContext } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch,isFetching } = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        const loginDetails = {
            username,password
        }
        try {
            const res = await axios.post("https://blog-mern-be.herokuapp.com/api/auth/login",loginDetails);
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE"})
        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form onSubmit={handleSubmit} className="loginForm">
                <label htmlFor="username"> Username</label>
                <input type="text" onChange={(e)=> setUsername(e.target.value) } value={username}  className="loginInput" id="username" />
                <label htmlFor="password"> Password</label>
                <input type="password" onChange={(e)=> setPassword(e.target.value) } className="loginInput" id="password" />
                <button type="submit" className={isFetching ? "isFetching" :"loginLoginBtn"} >Login</button>
            </form>
            <button type="submit" className="loginRegisterBtn" >
                <Link className="link" to="/register"> Register </Link>
            </button>
        </div>
    )
}

export default Login
