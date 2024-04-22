import { useState } from "react";
import { User } from "./client";
import * as client from "./client";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./userReducer";

function SignIn() {
    const [credentials, setCredentials] = useState<User>(
        { _id: "", username: "", password: "", email: "",
        following: [], followers: [],
        likesMovies: [], dislikesMovies: [],
        role: "USER" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {
        try {
            const currentUser = await client.signin(credentials);
            dispatch(setCurrentUser(currentUser));
            navigate(`/MovieMatrix/Profile/`);
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    const [error, setError] = useState("");

    return (
        <div className="p-4 ">
            <h1>Sign In</h1>
            <hr/>
            {error && <div>{error}</div>}
            <div className="p-2">
                <div className="row">
                    <label htmlFor="sign-in-username" className="col-sm-3 col-md-2 col-lg-1 p-2">Username:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="sign-in-username" type="text" style={{ maxWidth: '300px' }} placeholder="Your username"
                        className="form-control" value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="sign-in-password" className="col-sm-3 col-md-2 col-lg-1 p-2">Password:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="sign-in-password" type="password" style={{ maxWidth: '300px' }} placeholder="Your password"
                        className="form-control" value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-sm-3 offset-md-2 offset-lg-1">
                        <button className="btn btn-dark mt-3 me-3 mb-3" onClick={signin}>Sign In</button>
                        <button className="btn btn-light mt-3 me-3 mb-3" onClick={() => navigate("/MovieMatrix/SignUp")}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SignIn;