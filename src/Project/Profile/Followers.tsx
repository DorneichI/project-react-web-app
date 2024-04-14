import { useNavigate } from "react-router";
import * as client from "../../Users/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Followers() {

    const navigate = useNavigate();
    const signout = async () => {
        await client.signout();
        navigate("/MustardMatrix/SignIn");
    };

    const [profile, setProfile] = useState<client.User>({ _id: "", username: "", password: "", email: "", following: [], followers: [], role: "USER" });
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }

    useEffect(() => {
        fetchProfile();
        fetchUsers();
    }, []);

    const saveProfile = async () => {
        await client.updateUser(profile);
    };

    useEffect(() => {
        profile._id !== "" && saveProfile();
    }, [profile])

    const removeFollower = async (user: client.User) => {
        setProfile(profile => { return {...profile, followers: profile.followers.filter(id => id !== user._id)}});
        const newUser =  {...user, following: user.following.filter(id => id !== profile._id)};
        await client.updateUser(newUser);
    }

    return (
        <div className="p-4 ">
            <div className="d-flex">
                <div>
                    <h1>Followers</h1>
                </div>
                <div className="ms-auto">
                    <button className="btn btn-dark" onClick={signout}>Sign Out</button>
                </div>
            </div>
            <hr/>
            <div>
                {users && users.map((user: client.User) => (
                    <div key={user._id}>
                        {profile.followers.includes(user._id) && 
                            <>
                                <Link to={`/MustardMatrix/Profile/${user.username}`}>{user.username}</Link>
                                <button className="btn btn-dark" onClick={() => removeFollower(user)}>Remove</button>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Followers;