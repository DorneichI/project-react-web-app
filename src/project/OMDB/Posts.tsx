import { useEffect, useState } from "react";
import * as client from "../Users/client";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Posts({ title, id }: { title: string, id: string }) {
    const { currentUser } = useSelector((state: any) => state.user);
    const [posts, setPosts] = useState<any[]>([]);
    const fetchPosts = async () => {
        const posts = await client.findAllPosts();
        setPosts(posts);
    };

    useEffect(() => {
        {currentUser && fetchPosts()};
    }, [currentUser]);

    const navigate = useNavigate();
    const [post, setPost] = useState({ _id: "", title: "", body: "", movieTitle: title, movieId: id, userId: ""});
    const clear = () => {
        setPost({ _id: "", title: "", body: "", movieTitle: title, movieId: id, userId: ""});
    }
    const selectPost = async (post: any) => {
        try {
          const p = await client.findPostById(post._id);
          setPost(p);
        } catch (err) {
          console.log(err);
        }
    };
    const updatePost = async () => {
        if (currentUser) {
            try {
                const response = await client.updatePost(post);
                setPosts(posts.map((p) =>
                    (p._id === post._id ? post : p)));
                clear();
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate("/MovieMatrix/SignIn");
        }
      };
    const createPost = async () => {
        if (currentUser) {
            try {
                const p = {...post, userId: currentUser._id};
                const newPost = await client.createPost(p);
                setPosts([newPost, ...posts]);
                clear();
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate("/MovieMatrix/SignIn");
        }
    };
    const deletePost = async (post: any) => {
        try {
          await client.deletePost(post);
          setPosts(posts.filter((p) => p._id !== post._id));
        } catch (err) {
          console.log(err);
        }
    };

    const [users, setUsers] = useState<client.User[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getUsername = (userId: string) => {
        const user = users.find((user: client.User) => user._id === userId)
        if (user) {
            return user.username;
        } else {
            return "";
        }
    };

    return(
        <>
            <h5>Compose a Post</h5>
            <div className="p-2">
                <div className="row">
                    <label htmlFor="post-title" className="col-sm-3 col-md-2 col-lg-1 p-2">Title:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="post-title" type="text" style={{ maxWidth: '300px' }} placeholder="New Title"
                        className="form-control" value={post.title} 
                        onChange={(e) => setPost({ ...post, title: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="post-body" className="col-sm-3 col-md-2 col-lg-1 p-2">Body:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <textarea id="post-body" style={{ minHeight: '80px' }} className="form-control"
                        value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })}
                        placeholder={`What are your thoughts on this movie?`}/>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-sm-3 offset-md-2 offset-lg-1">
                        <button className="btn btn-dark mt-3 me-3 mb-3" onClick={createPost}>Post</button>
                        <button className="btn btn-secondary mt-3 me-3 mb-3" onClick={updatePost}>Update</button>
                        <button className="btn btn-danger mt-3 me-3 mb-3" onClick={clear}>Clear</button>
                    </div>
                </div>
            </div>
            <div>
                {posts && posts.filter((p) => p.movieId === id).map((post: any) => (
                    <div className="card m-2" key={post._id}>
                    <div className="mt-2 mb-2">
                        <div className="d-flex">
                            <div className="me-auto">
                                <h5 className="card-title">{post.title}</h5>
                                <Link to={`/MovieMatrix/Details/${post.movieId}`}>{post.movieTitle}</Link>
                            </div>
                            {post.userId === currentUser._id &&
                            <div>
                                <button className="btn btn-warning me-2" onClick={() => selectPost(post)}>
                                    <FaRegPenToSquare className="fs-5 text" />
                                </button>
                            </div>
                            }
                            {(post.userId === currentUser._id || currentUser.role === "ADMIN") &&
                            <div>
                                <button className="btn btn-danger me-2" onClick={() => deletePost(post)}>
                                    <FaRegTrashCan className="fs-5 text" />
                                </button>
                            </div>}
                            <div className="p-2">
                                <Link to={`/MovieMatrix/Profile/${getUsername(post.userId)}`}>{getUsername(post.userId)}</Link>
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

        </>
    );
};

export default Posts;