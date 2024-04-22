import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Account from "./Account";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import * as client from "../../Users/client";
import SignInOut from "../../Users/SignInOut";


function PublicProfile() {
    
    return (
        <div className="p-4 ">
            <div className="d-flex">
                <div>
                    <h1>Profile</h1>
                </div>
                <div className="ms-auto">
                    <SignInOut />
                </div>
            </div>
            <hr/>
            <Account />
            <hr/>
            <Posts />
        </div>        
    );
};

export default PublicProfile;