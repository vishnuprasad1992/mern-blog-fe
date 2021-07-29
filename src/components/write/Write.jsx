import "./write.css";
import { useState } from 'react';
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Write = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [desc, setDesc] = useState("");
    const { user } = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.photo = fileName;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
                console.log("image uploaded successfully")
            } catch (error) {
                console.log(error);
            }
        } 
        try {
            const res = await axios.post("http://localhost:5000/api/post", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="write">
            {file &&
                <img src={URL.createObjectURL(file)} alt="postImage" />
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="formWriteGroup">
                    <label htmlFor="writeInput"><i className="writeIcon fas fa-plus-circle"></i></label>
                    <input type="file" id="writeInput" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                    <input
                        type="text"
                        className="writeInput"
                        placeholder="Title Here..."
                        onChange={e => setTitle(e.target.value)}
                        autoFocus={true} />
                </div>
                <div className="formWriteGroup">
                    <textarea className="writeContent" onChange={e => setDesc(e.target.value)} placeholder="write your content here"></textarea>
                </div>
                <button className="publishBtn">Publish</button>
            </form>
        </div>
    )
}

export default Write
