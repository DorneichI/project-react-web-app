import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./userReducer";
import * as client from "./client";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SignInOut() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    const signOut = () => {
        if (pathname === "/MovieMatrix/Profile/") {
            navigate(`${currentUser.username}`);
        };
        client.signout();
        dispatch(setCurrentUser(null));
        console.log(pathname)
    }
    return(
        <>
        {currentUser &&
            <button className="btn btn-dark" onClick={() => signOut()}>Sign Out</button>}
        {!currentUser &&
            <Link to={`/MovieMatrix/SignIn`} className="btn btn-dark">Sign In</Link>}
        </>
    );
};

export default SignInOut;