import { useEffect, useState } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import * as client from "../../Users/client";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Posts() {
    const { currentUser } = useSelector((state: any) => state.user);
    const [posts, setPosts] = useState<any[]>([]);
    const fetchPosts = async () => {
        const posts = await client.findPostsByUserId(currentUser._id);
        setPosts(posts);
    };

    useEffect(() => {
        {currentUser && currentUser._id && fetchPosts()};
    }, [currentUser._id]);
    return (
        <>
            <div>
                <h3>Recent Posts</h3>
                <div className="p-2">
                    <div className="row">
                        <div className="row row-cols-1">
                            {posts && posts.map((post: any) => (
                                <div className="card m-2" key={post._id}>
                                    <div className="mt-2 mb-2">
                                        <div className="d-flex">
                                            <div className="me-auto">
                                                <h5 className="card-title">{post.title}</h5>
                                                <Link to={`/MovieMatrix/Details/${post.movieId}`}>{post.movieTitle}</Link>
                                                <br/>
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
                            {posts.length === 0 &&
                            <div className="m-2">No posts yet</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;