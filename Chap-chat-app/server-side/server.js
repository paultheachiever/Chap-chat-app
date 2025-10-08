import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import socketInit from "./socket/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 
        [
      "https://chap-chat.onrender.com",        
      "https://chap-chat-frontend.onrender.com", 
      "http://localhost:5173"                   
    ],
    methods: ["GET", "POST"],
},
transports: ["websocket", "polling"],
});

socketInit(io);

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));



//starting db
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}`));