import Account from "./Account";
import Posts from "./Posts";
import SignInOut from "../../Users/SignInOut";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import Users from "../../Users/Users";

function Profile() {
    const { currentUser } = useSelector((state: any) => state.user);


    return (
        <>
        {currentUser &&
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
            {currentUser.role === "ADMIN" &&
            <><hr/>
            <Users />
            </>}
        </div>
        }
        {!currentUser &&
        <Navigate to="/MovieMatrix/SignIn" />}
        </>
    );
};

export default Profile;