require ("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require ("cors");
const connectDB =  require ("./config/db");

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
        cors: { origin: "http://localhost:5173"}
});

require('./socket')(io);

app.use(cors());
app.use(express.json());


app.use("/api/auth", require ("./routes/authRoutes"));
app.use("/api/rooms", require ("./routes/roomRoutes"));
app.use("/api/messages", require ("./routes/messageRoutes"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

//starting db

connectDB();

const PORT =  process.env.PORT ||5000 
server.listen (PORT, ()=> console.log(`server running at: http://localhost:${PORT}`))