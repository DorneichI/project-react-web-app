
import { useNavigate } from "react-router";
import * as client from "../../Users/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Following() {

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

    const unfollow = async (user: client.User) => {
        setProfile(profile => { return {...profile, following: profile.following.filter(id => id !== user._id)}});
        const newUser =  {...user, followers: user.followers.filter(id => id !== profile._id)};
        await client.updateUser(newUser);
    }

    return(
        <div className="p-4 ">
            <div className="d-flex">
                <div>
                    <h1>Following</h1>
                </div>
                <div className="ms-auto">
                    <button className="btn btn-dark" onClick={signout}>Sign Out</button>
                </div>
            </div>
            <hr/>
            <div>
                {users && users.map((user: client.User) => (
                    <div key={user._id}>
                        {profile.following.includes(user._id) && 
                            <>
                                <Link to={`/MustardMatrix/Profile/${user.username}`}>{user.username}</Link>
                                <button className="btn btn-dark" onClick={() => unfollow(user)}>Unfollow</button>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Following;