import express from "express";
import dotenv from "dotenv";
import path from "path";
const app = express();
dotenv.config();

// Socket.io
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log("A new user has connected", socket.id);
    console.log("A new user message: " + message);
    // Send the message to all connected users
    io.emit("user-message", message);
  });
});

// app.get("/", (req, res) => {
//   const currentTime = new Date().toString().slice(0, 24);
//   res.send(`${currentTime} - Server Running! 🚀`);
// });

server.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});
