import { Navigate, useNavigate, useParams } from "react-router-dom";
import Account from "./Account";
import Posts from "./Posts";
import * as client from "../../Users/client";
import PublicProfile from "../PublicProfile";

function Profile() {
    const { username } = useParams();

    const navigate = useNavigate();
    const signout = async () => {
        await client.signout();
        navigate("/MustardMatrix/SignIn");
    };

    return (
        <div className="p-4 ">
            <div className="d-flex">
                <div>
                    <h1>Profile</h1>
                </div>
                <div className="ms-auto">
                    <button className="btn btn-dark" onClick={signout}>Sign Out</button>
                </div>
            </div>
            <hr/>
            <Account />
            <hr/>
            <div>
                <h3>Posts</h3>
                <Posts />
            </div>
        </div>
        
    );
};

export default Profile;