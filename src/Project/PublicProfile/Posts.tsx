import { useEffect, useState } from "react";
import * as client from "../../Users/client";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Posts() {
    const [profile, setProfile] = useState({ _id:"", username: "", password: "", email: "", role: "USER" });
    const { username } = useParams();

    const fetchProfile = async () => {
        const account = await client.profileByUsername(username);
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
        {profile._id && fetchPosts()};
    }, [username, profile._id]);

    const [posts, setPosts] = useState<any[]>([]);
    const fetchPosts = async () => {
        const posts = await client.findPostsByUserId(profile._id);
        setPosts(posts);
    };

    return (
        <>
            <h3>Recent Posts</h3>
            <div className="p-2">
                <div className="row">
                    <div className="row row-cols-1">
                        {posts && posts.map((post: any) => (
                            <div className="card" key={post._id}>
                                <div className="mt-2 mb-2">
                                    <div className="d-flex">
                                        <div className="me-auto">
                                            <h5 className="card-title">{post.title}</h5>
                                            <Link to={`/MovieMatrix/Details/${post.movieId}`}>{post.movieTitle}</Link>
                                        </div>
                                    </div>
                                    <p className="card-text mb-0">{post.body}</p>
                                    <div className="d-flex">
                                        <div className="me-auto">
                                            Date: {post.date.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;