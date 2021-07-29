import "./singlepost.css";
import { useState,useEffect,useContext } from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'
import { Context } from "../../context/Context";

const SinglePost = () => {
    const [post, setPost] = useState([]);
    const location = useLocation();
    const path =  location.pathname.split("/")[2];
    const [title,setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode,setUpdateMode] = useState(false);
    const {user} =useContext(Context);


    useEffect(() => {
        const fetchSinglePost = async() =>{
            const res = await axios.get(`https://blog-mern-be.herokuapp.com/api/post/${path}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
       fetchSinglePost();
    }, [path]);
    const PF = "http://localhost:5000/images/"; 
    const deleteHandler = async ()=>{
        try {
        const deletePost = await axios.delete(`https://blog-mern-be.herokuapp.com/api/post/${path}`,{
            data:{username: user.username}
        })
        console.log(deletePost.data)
        window.location.replace("/")
        } catch (error) {
            console.log(error)
        }
    }
    const updateHandler = () => {
        setUpdateMode(true);
    }
    const updatePost = async () =>{
        const updatedSinglePost = {
            title,
            desc,
            username:user.username
        };
        try {
            const postUpdated = await axios.put(`https://blog-mern-be.herokuapp.com/api/post/${path}`, updatedSinglePost )
            setPost(postUpdated.data)
            setUpdateMode(false)
            } catch (error) {
                console.log(error)
        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo &&
                <img src={PF+post.photo} alt="singleImage" />
                }
                {updateMode ? 
                <input type="text" className="singlePostTitleInput" onChange={e=>setTitle(e.target.value)} value={title} 
                  /> :
                <h1 className="singlePostTitle">
                   {post.title}
                   {user &&                    
                    <div className="singlePostEdit">
                    <i onClick={updateHandler} className="singlePostIcon fas fa-edit"></i>
                    <i onClick={deleteHandler} className="singlePostIcon fas fa-trash"></i>
                    </div>
                   } 
                </h1>
                }
                <div className="singlePostInfo">
                    <Link className="link" to={`/?username=${post.username}`}>
                    <span className="singlePostAuthor">Author : <b> {post.username}</b> </span></Link>
                    <span className="singlePostTime"> {new Date(post.createdAt).toDateString()} </span>
                </div>.
                {updateMode ? <textarea rows="10" value={desc} className="singlePostDescInput" onChange={e=>setDesc(e.target.value)}></textarea> :
                <p className="singlePostDesc">{post.desc} </p>
                }
                {
                updateMode && 
                <button className="singlePostUpdateBtn" onClick={updatePost} > Update</button>
                }
            </div>
        </div>
    )
}

export default SinglePost
