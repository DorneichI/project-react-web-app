import { useEffect, useState } from "react";
import * as client from "../../Users/client";

function List() {
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
                        {posts && posts.map((post: any) => (
                            <div className="card m-2" key={post._id}>
                                <div className="mt-2 mb-2">
                                    <div className="d-flex">
                                        <div className="me-auto">
                                            <h5 className="card-title">{post.title}</h5>
                                        </div>
                                        {/* <div>
                                            <button className="btn btn-warning me-2" onClick={() => selectPost(post)}>
                                                <FaRegPenToSquare className="fs-5 text" />
                                            </button>
                                            <button className="btn btn-danger me-2" onClick={() => deletePost(post)}>
                                                <FaRegTrashCan className="fs-5 text" />
                                            </button>
                                        </div> */}
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
        </>
    );
};

export default List;