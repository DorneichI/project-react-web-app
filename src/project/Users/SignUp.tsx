import { useState } from "react";
import * as client from "./client";
import { useNavigate } from "react-router";


function SignUp() {
    const [newUser, setNewUser] = useState({ username: "", password: "", email: "", role:"USER" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const signup = async () => {
        try {
          await client.signup(newUser);
          navigate("/MovieMatrix/Profile");
        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message);
        }
    }

    return (
        <div className="p-4 ">
            <h1>Sign Up</h1>
            <hr/>
            {error && <div>{error}</div>}
            <div className="p-2">
                <div className="row">
                    <label htmlFor="sign-up-username" className="col-sm-3 col-md-2 col-lg-1 p-2">Username:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="sign-up-username" type="text" style={{ maxWidth: '300px' }} placeholder="New username"
                        className="form-control" value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="sign-up-password" className="col-sm-3 col-md-2 col-lg-1 p-2">Password:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="sign-up-password" type="password" style={{ maxWidth: '300px' }} placeholder="New password"
                        className="form-control" value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="sign-up-email" className="col-sm-3 col-md-2 col-lg-1 p-2">Email:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11">
                        <input id="sign-up-email" type="email" style={{ maxWidth: '300px' }} placeholder="Your email address"
                        className="form-control" value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}/>
                    </div>
                </div>

                <div className="row">
                    <label className="col-sm-3 col-md-2 col-lg-1 p-2">Usertype:</label>
                    <div className="col-sm-9 col-md-10 col-lg-11 p-2">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="options-privacy" id="privacy-private"
                            value="PRIVATE" checked={newUser.role === "USER"} onChange={(e) => setNewUser({ ...newUser, role: "USER" })}/>
                            <label className="form-check-label" htmlFor="privacy-private">User</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="options-privacy" id="privacy-public"
                            value="PUBLIC" checked={newUser.role === "ADMIN"} onChange={(e) => setNewUser({ ...newUser, role: "ADMIN" })}/>
                            <label className="form-check-label" htmlFor="privacy-public">Admin</label>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="offset-sm-3 offset-md-2 offset-lg-1">
                        <button className="btn btn-dark mt-3 me-3 mb-3" onClick={signup}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;