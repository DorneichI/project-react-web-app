import { useEffect, useState } from "react";
import SignInOut from "../../Users/SignInOut";
import * as userClient from "../../Users/client";
import * as movieClient from "../../OMDB/client";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa6";

function Disliked() {
    const [profile, setProfile] = useState<userClient.User>(
        { _id: "", username: "", password: "", email: "",
        following: [], followers: [],
        likesMovies: [], dislikesMovies: [],
        role: "USER" });
    const fetchProfile = async () => {
        const account = await userClient.profile();
        setProfile(account);
    };
    const [movies, setMovies] = useState<any[]>();
    const fetchMovies = async () => {
        const movies = await movieClient.findAllMovies();
        setMovies(movies);
    };
    useEffect(() => {
        fetchProfile();
        fetchMovies();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="p-4 ">
            <div className="d-flex">
                <div className="d-flex">
                    <FaCaretLeft className="fs-2 m-2" onClick={() => navigate("/MovieMatrix/Profile")}/>
                    <h1>Disliked</h1>
                </div>
                <div className="ms-auto">
                    <SignInOut />
                </div>
            </div>
            <hr/>
            <div className="list-group list-group-flush">
                {movies && movies.map((movie: any) => (
                    <div key={movie.movieId} className={movie.dislikedBy.includes(profile._id) ? "list-group-item" : ""}>
                    {movie.dislikedBy.includes(profile._id) && 
                            <Link to={`/MovieMatrix/Details/${movie.movieId}`}>{movie.title}</Link >
                    }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Disliked;