import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import * as profileClient from "../Users/client";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

function OMDBDetails() {
    const { currentUser } = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const { imdbID } = useParams();
    
    const [movie, setMovie] = useState<any>();
    const [dbMovie, setDbMovie] = useState<any>({});

    const findMovieByID = async (movieId: string) => {
        const movie = await client.movieByID(movieId);
        setMovie(movie);
    };
    const findMovieByMovieID = async (movieId: string) => {
        const movie = await client.movieByMovieID(movieId);
        setDbMovie(movie);
    };

    useEffect(() => {
        if (imdbID) {
            findMovieByID(imdbID);
            findMovieByMovieID(imdbID);
        }
    }, [imdbID]);

    const like = async () => {
        if (currentUser) {
            if ((!dbMovie || !dbMovie.likedBy.includes(currentUser._id))) {
                const response = await client.userLikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                if (dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) {
                    dislike();
                }
                setDbMovie(response);
            } else {
                const response = await client.userUnlikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                })
                setDbMovie(response);
            }
        } else {
            navigate("/MustardMatrix/SignIn");
        }
    };
    const dislike = async () => {
        if (currentUser) {
            if ((!dbMovie || !dbMovie.dislikedBy.includes(currentUser._id))) {
                const response = await client.userDislikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                });
                if (dbMovie && dbMovie.likedBy.includes(currentUser._id)) {
                    like();
                }
                setDbMovie(response);
            } else {
                const response = await client.userUndislikesMovie({
                    title: movie.Title,
                    movieId: movie.imdbID,
                })
                setDbMovie(response);
            }
        } else {
            navigate("/MustardMatrix/SignIn");
        }
    }

    return(
        <div className="p-4">
            {movie && <>
            {/* {JSON.stringify(dbMovie)}
            {currentUser && <>{currentUser.username}</>} */}
            <div className="d-flex justify-content-center">
                <h1>{movie.Title}</h1>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
                {movie.Poster !== "N/A" && <img src={movie.Poster} />}
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary align-self-center m-2" onClick={like}>
                    {(dbMovie && dbMovie.likedBy.includes(currentUser._id)) &&
                        <FaThumbsUp className="" />}
                    {!(dbMovie && dbMovie.likedBy.includes(currentUser._id)) &&
                        <FaRegThumbsUp className="" />}
                </button>
                <button className="btn btn-secondary align-self-center m-2" onClick={dislike}>
                    {(dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) &&
                        <FaThumbsDown className="" />}
                    {!(dbMovie && dbMovie.dislikedBy.includes(currentUser._id)) &&
                        <FaRegThumbsDown className="" />}
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
            </>
            }
        </div>
    );
};

export default OMDBDetails;