import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "./Home";
import Profile from "./Profile";
import "./index.css";
import SignIn from "../Users/SignIn";
import { Provider } from "react-redux";
import store from "./store";
import CurrentUser from "../Users/CurrentUser";
import PublicProfile from "./PublicProfile";
import Following from "./Profile/Following";
import Followers from "./Profile/Followers";
import OMDBSearch from "../OMDB/Search";
import OMDBDetails from "../OMDB/Details";
import SignUp from "../Users/SignUp";
import Liked from "./Profile/Liked";
import Disliked from "./Profile/Disliked";

function MovieMatrix() {

    return (
        <Provider store={store}>
            <CurrentUser>
                <div className="d-block d-sm-none">
                    <Navigation />
                </div>
                
                <div className="d-flex">
                    <div className="d-none d-sm-block">
                    <Navigation />
                    </div>
                    <div style={{ flexGrow: 1 }} className="wd-overflow">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home/>} />
                        <Route path="Search/:term?/:page?" element={<OMDBSearch />} />
                        <Route path="Details/:imdbID" element={<OMDBDetails />} />
                        <Route path="Profile/:username" element={<PublicProfile />} />
                        <Route path="Profile/Following" element={<Following />} />
                        <Route path="Profile/Followers" element={<Followers />} />
                        <Route path="Profile/Liked" element={<Liked />} />
                        <Route path="Profile/Disliked" element={<Disliked />} />
                        <Route path="Profile" element={<Profile />} />
                        <Route path="SignIn" element={<SignIn />} />
                        <Route path="SignUp" element={<SignUp />} />
                    </Routes>
                    </div>
                </div>
            </CurrentUser>
        </Provider>
    );
};

export default MovieMatrix;