import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as omdbClient from "./client";
import * as userClient from "../Users/client";
import * as profileClient from "../Users/client";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts";
import { setCurrentUser } from "../Users/userReducer";

function OMDBDetails() {
    const { currentUser } = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const { imdbID } = useParams();
    
    const [movie, setMovie] = useState<any>();
    const [dbMovie, setDbMovie] = useState<any>({});

    const findMovieByID = async (movieId: string) => {
        const movie = await omdbClient.movieByID(movieId);
        setMovie(movie);
    };
    const findMovieByMovieID = async (movieId: string) => {
        const movie = await omdbClient.movieByMovieID(movieId);
        setDbMovie(movie);
    };

    useEffect(() => {
        if (imdbID) {
            findMovieByID(imdbID);
            findMovieByMovieID(imdbID);
        }
    }, [imdbID]);

    const dispatch = useDispatch();
    const like = async () => {
        if (currentUser) {
            if ((!dbMovie || !dbMovie.likedBy.includes(currentUser._id))) {
                const response = await omdbClient.userLikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                if (dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) {
                    dislike();
                };
                console.log("response", response, "movie", response.movie);
                setDbMovie(response.movie);
                console.log("dbMovie", dbMovie);
                dispatch(setCurrentUser(response.user));
            } else {
                const response = await omdbClient.userUnlikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                console.log(response, response.movie);
                setDbMovie(response.movie);
                dispatch(setCurrentUser(response.user));
            }
        } else {
            navigate("/MovieMatrix/SignIn");
        }
    };
    const dislike = async () => {
        if (currentUser) {
            if ((!dbMovie || !dbMovie.dislikedBy.includes(currentUser._id))) {
                const response = await omdbClient.userDislikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                if (dbMovie && dbMovie.likedBy.includes(currentUser._id)) {
                    like();
                };
                console.log(response, response.movie);
                setDbMovie(response.movie);
                dispatch(setCurrentUser(response.user));
            } else {
                const response = await omdbClient.userUndislikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                console.log(response, response.movie);
                setDbMovie(response.movie);
                dispatch(setCurrentUser(response.user));
            }
        } else {
            navigate("/MovieMatrix/SignIn");
        }
    }

    return(
        <div className="p-4">
            {movie && <>
            <div className="d-flex justify-content-center">
                <h1>{movie.Title}</h1>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
                {movie.Poster !== "N/A" && <img src={movie.Poster} />}
            </div>
            
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary align-self-center m-2" onClick={like}>
                    {currentUser && <>
                        {(dbMovie && dbMovie.likedBy.includes(currentUser._id)) &&
                            <FaThumbsUp className="" />}
                        {!(dbMovie && dbMovie.likedBy.includes(currentUser._id)) &&
                            <FaRegThumbsUp className="" />}
                    </>}
                    {!currentUser && <FaRegThumbsUp className="" />}
                </button>
                <button className="btn btn-secondary align-self-center m-2" onClick={dislike}>
                    {currentUser && <>
                        {(dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) &&
                            <FaThumbsDown className="" />}
                        {!(dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) &&
                            <FaRegThumbsDown className="" />}
                     </>}
                     {!currentUser && <FaRegThumbsDown className="" />}
                </button>
            </div>
            Year: {movie.Year}<br/>
            Rated: {movie.Rated}<br/>
            Released: {movie.Released}<br/>
            Runtime: {movie.Runtime}<br/>
            Genre: {movie.Genre}<br/>
            Director: {movie.Director}<br/>
            Writer: {movie.Writer}<br/>
            Actors: {movie.Actors}<br/>
            Plot: {movie.Plot}<br/>
            Language: {movie.Language}<br/>
            Country: {movie.Country}<br/>
            Awards: {movie.Awards}<br/>
            <hr/>
            <Posts title={movie.Title} id={movie.imdbID}/>
            </>
            }
        </div>
    );
};

export default OMDBDetails;