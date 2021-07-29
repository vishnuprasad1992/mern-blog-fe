import "./register.css"
import { Link } from "react-router-dom"
import { useState } from 'react';
import axios from 'axios'
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const newUser = {
            username,
            email,
            password
        };
        try {
            const res = await axios.post("https://blog-mern-be.herokuapp.com/api/auth/register",newUser)
            res.data && window.location.replace("/login");
        } catch (error) {
            setError(true)
            setTimeout(()=>{
                setError(false)
            },5000)
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="username"> Username</label>
                <input type="text" onChange={e => setUsername(e.target.value)}
                    value={username} className="registerInput" id="username" />
                <label htmlFor="email"> Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)}
                    value={email} className="registerInput" id="email" />
                <label htmlFor="password"> Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}
                    value={password} className="registerInput" id="password" />
                <button type="submit" className="registerBtn" >Register</button>
            </form>
            {error && <span style={{color:"red",marginTop:"20px" }} >something went wrong,please try again</span>}
            <button type="submit" className="loginBtn" >
                <Link className="link" to="/login"> Login </Link>
            </button>
        </div>
    )
}

export default Register
