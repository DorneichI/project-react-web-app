import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Account from "./Account";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import * as client from "../../Users/client";


function PublicProfile() {
    const { currentUser } = useSelector((state: any) => state.user);

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
                    {currentUser &&
                        <button className="btn btn-dark" onClick={() => signout()}>Sign Out</button>}
                    {!currentUser &&
                        <Link to={`/MustardMatrix/SignIn`} className="btn btn-dark">Sign In</Link>}
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

export default PublicProfile;