import axios from "axios";
import { BASE_API, USERS_API } from "../Users/client";

const KEY = process.env.REACT_APP_OMDB_API_KEY
const OMDBURL = `http://www.omdbapi.com/?apikey=${KEY}&`

const axiosWithCredentials = axios.create({
    withCredentials: true
});

export const fullTextSearch = async (text: string) => {
    const response = await axios.get(`${OMDBURL}s=${text}`);
    return response.data;
};
export const fullTextSearchByPage = async (text: string, page: number) => {
    const response = await axios.get(`${OMDBURL}s=${text}&page=${page}`);
    return response.data;
};
export const movieByID = async (id: string) => {
    const response = await axios.get(`${OMDBURL}i=${id}`);
    return response.data;
}
export const userLikesMovie = async (movie: any) => {
    const response = await axiosWithCredentials.post(
      `${BASE_API}/api/likes`,
      movie
    );
    return response.data;
};
export const userUnlikesMovie = async (movie: any) => {
    const response = await axiosWithCredentials.delete(
      `${BASE_API}/api/likes/${movie.movieId}`
    );
    return response.data;
};
export const userDislikesMovie = async (movie: any) => {
    const response = await axiosWithCredentials.post(
      `${BASE_API}/api/dislikes`,
      movie
    );
    return response.data;
};
export const userUndislikesMovie = async (movie: any) => {
    const response = await axiosWithCredentials.delete(
      `${BASE_API}/api/dislikes/${movie.movieId}`
    );
    return response.data;
};
export const movieByMovieID = async (movieId: string) => {
    const response = await axios.get(`${BASE_API}/api/movies/${movieId}`);
    return response.data;
};