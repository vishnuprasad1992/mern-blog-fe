import "./topbar.css"
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
const Topbar = () => {
    const {user,dispatch} = useContext(Context);

    const logoutHandler = () => {
        dispatch({type:"LOGOUT"});
    }
    const PF = "http://localhost:5000/images/"
    return (
        <div className="topbar">
            <div className="topLeft">
            <i className="fab fa-2x fa-facebook socialIcons"></i>
            <i className="fab fa-2x fa-instagram-square socialIcons"></i>
            <i className="fab fa-2x fa-pinterest-square socialIcons"></i>
            <i className="fab fa-2x fa-twitter-square socialIcons"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <Link className="link" to="/">
                    <li className="topListItems">home</li>
                    </Link>
                    <Link className="link" to="/about">
                    <li className="topListItems">about</li>
                    </Link>
                    <Link className="link" to="/contact">
                    <li className="topListItems">contact</li>
                    </Link>
                    <Link className="link" to="/write">
                        {user && <li className="topListItems">write</li>}
                    </Link>
                    {user && <li onClick={logoutHandler} className="topListItems">logout</li>}
                </ul>
            </div>
            <div className="topRight">
                {user ? <Link className="link" to={`/settings`}>
                    <img 
                    src={user.profilePicture ? PF+user.profilePicture :"https://images.pexels.com/photos/7137417/pexels-photo-7137417.jpeg?cs=srgb&dl=pexels-monica-turlui-7137417.jpg&fm=jpg"} alt="profilePic" 
                    className="topImage"/> </Link>: 
                    <ul className="topList">
                    <Link className="link" to="/login">
                    <li className="topListItems">Login</li>
                    </Link>
                    <Link className="link" to="/register">
                    <li className="topListItems">Register</li>
                    </Link>
                    </ul>
                }
                
                <i className="searchIcon fas fa-2x fa-search"></i>
            </div>
        </div>
    )
}

export default Topbar
