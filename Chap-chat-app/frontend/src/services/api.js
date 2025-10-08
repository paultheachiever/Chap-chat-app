import axios from "axios";
import {io} from "socket.io-client";

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const APIBaseUrl = import.meta.env.VITE_API_BASE_URL;


const API = axios.create({
    baseURL:APIBaseUrl,
}) ;

export const  registerUser = (username)=>
    API.post("/auth/register", {username});

export const getRooms = ()=> API.get("/rooms");
export const createRoom = (name) => API.post("/rooms", {name});
export const getMessages = (roomId) => API.get(`/messages/${roomId}`);

export const socket= io(serverBaseUrl,{autoConnect: false});