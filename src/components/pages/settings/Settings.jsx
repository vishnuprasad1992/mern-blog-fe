import "./settings.css";
import Sidebar from "../../sidebar/Sidebar";
import { useState } from 'react'
import { useContext } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";


const Settings = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState("");
    const [password, setPassword] = useState("");
    const [success,setSuccess] = useState(false)
    const { user,dispatch } = useContext(Context)

    const PF = "http://localhost:5000/images/"
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updateUser = {
            userID: user._id,
            username,
            email,
            password,
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updateUser.profilePicture = fileName;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
                console.log("image uploaded successfully")
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res =  await axios.put(`http://localhost:5000/api/user/${user._id}`, updateUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS",payload:res.data})

        } catch (error) {
            console.log(error);
            dispatch({type: "UPDATE_FAILURE"});
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsUpdate">
                    <span className="updateAccount">Update Your Account</span>
                    <span className="deleteAccount">Delete Your Account</span>
                </div>
                <form onSubmit={handleSubmit} className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPp">
                        
                        <img src={file ?  URL.createObjectURL(file) : PF+user.profilePicture} alt="chaplin" />                         
                        <label htmlFor="inputFile"><i className=" ppIcon fas fa-user-circle"></i></label>
                        <input type="file" id="inputFile" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={e => setUsername(e.target.value)} 
                    value={username} id="username" placeholder={user.username} />
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} 
                    value={email} id="email" placeholder={user.email} />
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" id="password" />
                    <button type="submit" className="updateBtn"  >Update</button>
                </form>
                {success && 
                    <span style={{color:"green",marginTop:"20px",textAlign:"center"}} > User updated successfully</span>
                }
            </div>
            <Sidebar />
        </div>
    )
}

export default Settings
