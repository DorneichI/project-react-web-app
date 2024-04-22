import { Link, useNavigate } from "react-router-dom";
import List from "./List";
import SignInOut from "../../Users/SignInOut";
import { useSelector } from "react-redux";
import { useState } from "react";


function Home() {
    const { currentUser } = useSelector((state: any) => state.user);
    const [global, setGlobal] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="p-4">
            <div className="d-flex">
                <div className="">
                    <h1>The Movie Matrix</h1>
                </div>
                <div className="ms-auto">
                    <SignInOut />
                </div>
            </div>
            <div className="fs-4 p-2">
                    #1 place to rant about your favourite and least favourite movies
            </div>
            <hr/>
            <ul className="pagination justify-content-center">
                <li className="page-item"><button onClick={() => setGlobal(true)} className={`page-link ${global ? "bg-black text-light" : "bg-white text-black"}`}>Global</button></li>
                <li className="page-item"><button onClick={() => currentUser ? setGlobal(false) : navigate("/MovieMatrix/SignIn")} className={`page-link ${!global ? "bg-black text-light" : "bg-white text-black"} page-link`}>Following</button></li>
            </ul>
            <div>
                <List global={global}  />
            </div>
        </div>
    );
};

export default Home;