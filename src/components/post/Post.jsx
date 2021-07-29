import "./post.css";
import {Link} from 'react-router-dom'
const Post = ({ post }) => {
    const PF = "https://blog-mern-be.herokuapp.com/images/"; 
    return (
        <div className="post">
            {post.photo &&
                <div className="postImage">
                    <img src={PF+post.photo} alt="bg" />
                </div>
            }

            <div className="postDetails">
                {post.categories.map(cat => <span className="postCat">{cat}</span>)}
            <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span></Link>
                <span className="postedDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    )
}

export default Post;
