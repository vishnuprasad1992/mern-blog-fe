import "./home.css"
import Posts from "../../posts/Posts"
import Header from "../../header/Header"
import Sidebar from "../../sidebar/Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const Home = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const search = location.search;

    useEffect(() => {

        const searchPost = async () =>{
            const res = await axios.get(`http://localhost:5000/api/post/${search}`);
            setPosts(res.data);
        }
        searchPost();
    }, [search])

	// useEffect(() => {
	// 	const getPosts = async () => {
	// 		try {
	// 			await axios.get("http://localhost:5000/api/post")
	// 				.then(res => setPosts(res.data))
	// 				.catch(err => console.log(err));
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// 	getPosts();
	// }, [])
// console.log(posts);
    return (
        <>
        <Header />
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
        </>
    )
}

export default Home
