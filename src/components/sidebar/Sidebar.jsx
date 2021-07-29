import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [cat, setCat] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get("http://localhost:5000/api/category")
            setCat(res.data)
        }
        getCategories();
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarItems">
                <span className="sidebarTitle"> ABOUT ME</span><br />
                <img src="https://images.pexels.com/photos/4675825/pexels-photo-4675825.jpeg?cs=srgb&dl=pexels-zura-modebadze-4675825.jpg&fm=jpg" alt="about" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo autem, doloribus, quaerat unde cumque id.</p>
            </div>
            <div className="sidebarItems">
                <span className="sidebarTitle"> CATEGORIES </span>
                <ol className="sidebarList">
                    {cat.map(category =>
                        <Link className="link" key={category._id} to={`/?cat=${category.name}`}>
                            <li  className="sidebarListItem">{category.name}</li>
                        </Link>
                    )
                    }
                </ol>
            </div>
            <div className="sidebarItems">
                <span className="sidebarTitle"> SOCIAL MEDIA </span><br />
                <div className="media">
                    <i className="fab fa-2x fa-facebook sidebarIcon"></i>
                    <i className="fab fa-2x fa-instagram-square sidebarIcon"></i>
                    <i className="fab fa-2x fa-pinterest-square sidebarIcon"></i>
                    <i className="fab fa-2x fa-twitter-square sidebarIcon"></i>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
