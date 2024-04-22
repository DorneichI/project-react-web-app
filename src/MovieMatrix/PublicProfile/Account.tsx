import { useParams } from "react-router";
import * as client from "../../Users/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Users/userReducer";

function Account() {
    const [profile, setProfile] = useState<client.User>(
        { _id: "", username: "", password: "", email: "",
        following: [], followers: [],
        likesMovies: [], dislikesMovies: [],
        role: "USER" });
    const fetchProfile = async () => {
        const account = await client.profileByUsername(username);
        setProfile(account);
    };

    const { username } = useParams();
    const { currentUser } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        fetchProfile();
    }, [username]);



    const save = async () => {
        console.log()
        await client.updateUser(currentUser);
        await client.updateUser(profile);
    };

    useEffect(() => {
        currentUser && currentUser._id !== "" && profile._id !== "" && save();
    }, [currentUser])


    const follow = () => {
        if (currentUser && currentUser.username === username || currentUser.following.includes(profile._id)) {
        } else {
            dispatch(setCurrentUser({...currentUser, following: [...currentUser.following, profile._id]}));
            setProfile(profile => { return {...profile, followers: [...profile.followers, currentUser._id]}});
        }
    }

    const unfollow = () => {
        if (currentUser && currentUser.username === username || !currentUser.following.includes(profile._id)) {
        } else {
            dispatch(setCurrentUser({...currentUser, following: currentUser.following.filter((id: string) => id !== profile._id)}))
            setProfile(profile => { return {...profile, followers: profile.followers.filter(id => id !== currentUser._id)}});
        }
    }
    return(
        <>
            <div className="d-flex">
                <h3 >Account</h3>
                { currentUser && !currentUser.following.includes(profile._id) && <button className="btn btn-dark ms-3" onClick={follow}>Follow</button> }
                { currentUser && currentUser.following.includes(profile._id) && <button className="btn btn-dark ms-3" onClick={unfollow}>Unfollow</button> }
            </div>
            <div className="p-2">
                <div className="row">
                    <label htmlFor="account-username" className="col-sm-3 col-md-2 col-lg-1 p-2">Username:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11 p-2">
                        {profile.username}
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="account-email" className="col-sm-3 col-md-2 col-lg-1 p-2">Email:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11 p-2">
                        {profile.email}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;

