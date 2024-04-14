import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as client from "../../Users/client";



function Account() {
    const [profile, setProfile] = useState<client.User>({ _id: "", username: "", password: "", email: "", followers: [], following: [], role: "USER" });
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const save = async () => {
        await client.updateUser(profile);
    };
    return (
        <>
            <h3>Account</h3>
            <div className="p-2">
                <div className="row">
                    <label htmlFor="account-username" className="col-sm-3 col-md-2 col-lg-1 p-2">Username:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="account-username" type="text" style={{ maxWidth: '300px' }} placeholder="NewUsername123"
                        className="form-control" value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="account-password" className="col-sm-3 col-md-2 col-lg-1 p-2">Password:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="account-password" type="password" style={{ maxWidth: '300px' }} placeholder="NewPa55w0rd"
                        className="form-control"  value={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="account-email" className="col-sm-3 col-md-2 col-lg-1 p-2">Email:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="account-email" type="email" style={{ maxWidth: '300px' }} placeholder="new@email.com"
                        className="form-control" value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-sm-3 offset-md-2 offset-lg-1">
                        <button className="btn btn-dark mt-3 me-3 mb-3" onClick={save}>Update</button>
                    </div>
                </div>
                <div className="row">
                    <label className="col-sm-3 col-md-2 col-lg-1 p-2">Followers:</label>
                    <div className="col-sm-2 col-md-1 col-lg-1">
                        <Link to={`Followers`} className="btn btn-secondary">{profile.followers.length}</Link>
                    </div>
                    <label className="col-sm-3 col-md-2 col-lg-1 p-2">Following:</label>
                    <div className="col-sm-4 col-md-7 col-lg-9">
                        <Link to={`Following`} className="btn btn-secondary">{profile.following.length}</Link>
                    </div>
                </div>
                <div className="row">
                    
                </div>
            </div>
        </>
    );
};

export default Account;