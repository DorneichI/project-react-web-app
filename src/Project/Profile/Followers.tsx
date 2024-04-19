import { Navigate, useNavigate } from "react-router";
import * as client from "../../Users/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignInOut from "../../Users/SignInOut";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Users/userReducer";
import { FaCaretLeft } from "react-icons/fa6";

function Followers() {
    const { currentUser } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const saveProfile = async () => {
        await client.updateUser(currentUser);
    };

    useEffect(() => {
        currentUser && currentUser._id !== "" && saveProfile();
    }, [currentUser])

    const removeFollower = async (user: client.User) => {
        dispatch(setCurrentUser({...currentUser, followers: currentUser.followers.filter((id: string) => id !== user._id)}));
        const newUser =  {...user, following: user.following.filter(id => id !== currentUser._id)};
        await client.updateUser(newUser);
    }

    const navigate = useNavigate();

    return (
        <>
            {currentUser &&
                <div className="p-4 ">
                    <div className="d-flex">
                        <div className="d-flex">
                            <FaCaretLeft className="fs-2 m-2" onClick={() => navigate("/MovieMatrix/Profile")}/>
                            <h1>Followers</h1>
                        </div>
                        <div className="ms-auto">
                            <SignInOut />
                        </div>
                    </div>
                    <hr/>   
                    <div className="list-group list-group-flush">
                            {users && users.map((user: client.User) => (
                                <div key={user._id} className={`d-flex justify-content-between ${currentUser.followers.includes(user._id) ? "list-group-item" : ""}`}>
                                    {currentUser.followers.includes(user._id) && 
                                        <>
                                            <Link to={`/MovieMatrix/Profile/${user.username}`}>{user.username}</Link>
                                            <button className="btn btn-dark" onClick={() => removeFollower(user)}>Remove</button>
                                        </>
                                    }
                                </div>
                            ))}
                    </div>
                    
                </div>}
            {!currentUser &&
                <Navigate to="/MovieMatrix/SignIn" />}
        </>
    );
};


export default Followers;