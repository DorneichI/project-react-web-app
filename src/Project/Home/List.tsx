import { useEffect, useState } from "react";
import * as client from "../../Users/client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Post({post}: {post: any}) {
    const [user, setUser] = useState<client.User>({_id: "", username: "", password: "", email: "",
    following: [], followers: [],
    likesMovies: [], dislikesMovies: [],
    role: "USER"});

    const fetchUsername = async () => {
        const user = await client.findUserById(post.userId);
        setUser(user);
    }

    useEffect(() => {
        fetchUsername();
      }, []);
    return(
        <div className="card m-2" key={post._id}>
            <div className="mt-2 mb-2">
                <div className="d-flex">
                    <div className="me-auto">
                        <h5 className="card-title">{post.title}</h5>
                        <Link to={`/MovieMatrix/Details/${post.movieId}`}>{post.movieTitle}</Link>
                        <br/>
                    </div>
                    <div>
                        <Link to={`/MovieMatrix/Profile/${user.username}`}>{user.username}</Link>
                    </div>
                </div>
                <p className="card-text mb-0">{post.body}</p>
                <div className="d-flex">
                    <div className="me-auto">
                        Date: {
                        post.date.toLocaleString().substring(0, 10) + " " + post.date.toLocaleString().substring(11, 19)}
                    </div>
                </div>
            </div>
        </div>
    );
};


function List({global}: {global: boolean}) {
    const { currentUser } = useSelector((state: any) => state.user);

    const [posts, setPosts] = useState<any[]>([]);
    const fetchPosts = async () => {
        const posts = await client.findAllPosts();
        setPosts(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div className="p-2">
                <div className="row">
                    <div className="row row-cols-1">
                        {posts && global && posts.map((post: any) => (
                            <Post key={post._id} post={post} /> 
                        ))}
                        {posts && !global && currentUser && posts.filter((p) => currentUser.following.includes(p.userId)).map((post: any) => (
                            <Post key={post._id} post={post} /> 
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;