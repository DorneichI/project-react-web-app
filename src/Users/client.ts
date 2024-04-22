import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/projectapi/users`;
export const POSTS_API = `${BASE_API}/projectapi/posts`;
export interface User { _id: string; username: string; password: string; email: string;
    following: string[], followers: string[],
    likesMovies: string[], dislikesMovies: string[],
    role: string; };

const axiosWithCredentials = axios.create({
    withCredentials: true
});

export const signin = async (credentials: User) => {
    const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
    return response.data;
};
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};
export const profileByUsername = async (username: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile/${username}`);
    return response.data;
};
export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
};
export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};
export const deleteUser = async (user: any) => {
    const response = await axios.delete(
    `${USERS_API}/${user._id}`);
    return response.data;
};
export const findUserById = async (id: string): Promise<User> => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};
export const findAllPosts = async () => {
    const response = await axios.get(`${POSTS_API}`);
    return response.data;
};
export const findPostsByUserId = async (id: any) => {
    const response = await axios.get(`${POSTS_API}/by/${id}`);
    return response.data;
};
export const findPostById = async (id: any) => {
    const response = await axios.get(`${POSTS_API}/${id}`);
    return response.data;
};
export const updatePost = async (post: any) => {
    const response = await axios.put(`${POSTS_API}/${post._id}`, post);
    return response.data;
};
export const createPost = async (post: any) => {
    const response = await axios.post(`${POSTS_API}`, post);
    return response.data;
};
export const deletePost = async (post: any) => {
    const response = await axios.delete(
    `${POSTS_API}/${post._id}`);
    return response.data;
};