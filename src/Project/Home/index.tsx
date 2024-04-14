import { Link } from "react-router-dom";
import List from "./List";
import { useSelector } from "react-redux";
import * as client from "../../Users/client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Profile/userReducer";


function Home() {
    const { currentUser } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    const signOut = () => {
        client.signout();
        dispatch(setCurrentUser(null));
    }
    return (
        <div className="p-4">
            <div className="d-flex">
                <div className="">
                    <h1>The Mustard Matrix</h1>
                </div>
                <div className="fs-4 p-2">
                    #1 Mustard Enthusiat Network
                </div>
                <div className="ms-auto">
                    {currentUser &&
                        <button className="btn btn-dark" onClick={() => signOut()}>Sign Out</button>}
                    {!currentUser &&
                        <Link to={`/MustardMatrix/SignIn`} className="btn btn-dark">Sign In</Link>}
                    <button className="btn btn-dark" onClick={() => console.log(currentUser)}>check user</button>
                </div>
            </div>
            <hr/>

            <ul className="pagination justify-content-center">
                <li className="page-item"><Link to={``} className="page-link">Global</Link></li>
                <li className="page-item"><Link to={``} className="page-link">Following</Link></li>
            </ul>
            <div>
                <List />
            </div>
        </div>
    );
};

export default Home;