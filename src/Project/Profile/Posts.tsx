import { useEffect, useState } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import * as client from "../../Users/client";

function Posts() {
    const [profile, setProfile] = useState({ _id: "", username: "", password: "", email: "", role: "USER" });
    const [posts, setPosts] = useState<any[]>([]);
    const fetchPosts = async () => {
        const posts = await client.findPostsByUserId(profile._id);
        setPosts(posts);
    };
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        {profile._id && fetchPosts()};
    }, [profile._id]);

    const [post, setPost] = useState({ _id: "", dateTime: "", title: "", body: "", privacy: "" });
    const clear = () => {
        setPost({ _id: "", dateTime: "", title: "", body: "", privacy: "" })
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
        try {
          const status = await client.updatePost(post);
          setPosts(posts.map((p) =>
            (p._id === post._id ? post : p)));
        } catch (err) {
          console.log(err);
        }
      };
    const createPost = async () => {
        try {
            console.log(post);

            const p = {...post, userId: profile._id};
            const newPost = await client.createPost(p);
            setPosts([newPost, ...posts]);
            clear();
        } catch (err) {
            console.log(err);
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
    return (
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
                        value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-3 col-md-2 col-lg-1 p-2">Privacy:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11 p-2">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="options-privacy" id="privacy-private"
                            value="PRIVATE" checked={post.privacy === "PRIVATE"} onChange={(e) => setPost({ ...post, privacy: "PRIVATE" })}/>
                            <label className="form-check-label" htmlFor="privacy-private">Private</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="options-privacy" id="privacy-public"
                            value="PUBLIC" checked={post.privacy === "PUBLIC"} onChange={(e) => setPost({ ...post, privacy: "PUBLIC" })}/>
                            <label className="form-check-label" htmlFor="privacy-public">Public</label>
                        </div>
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
                <h5>Recent Posts</h5>
                <div className="p-2">
                    <div className="row">
                        <div className="row row-cols-1">
                            {posts && posts.map((post: any) => (
                                <div className="card m-2" key={post._id}>
                                    <div className="mt-2 mb-2">
                                        <div className="d-flex">
                                            <div className="me-auto">
                                                <h5 className="card-title">{post.title}</h5>
                                            </div>
                                            <div>
                                                <button className="btn btn-warning me-2" onClick={() => selectPost(post)}>
                                                    <FaRegPenToSquare className="fs-5 text" />
                                                </button>
                                                <button className="btn btn-danger me-2" onClick={() => deletePost(post)}>
                                                    <FaRegTrashCan className="fs-5 text" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="card-text mb-0">{post.body}</p>
                                        <div className="d-flex">
                                            <div className="me-auto">
                                                Date: {post.date.toLocaleString()}
                                            </div>
                                            <div>
                                                {post.privacy === "PUBLIC" ? "Public" : "Private"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;