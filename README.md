Chap Chat Application

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for instant communication. Users can register, join rooms, send and receive messages in real-time, and view online user activity. The app is deployed on Render, with separate hosting for the frontend and backend.


⚙️ Installation and Setup
1. Prerequisites

Before running the project, make sure you have installed:

Node.js (v16 or above)

npm or pnpm

MongoDB (local or cloud instance, e.g., MongoDB Atlas)

💬 Using the Chat Application

Register or Log In:
Open the app and create a new account using your username.

Join a Room:
Enter a room name or ID to join an existing chat room or create a new one automatically.

Start Chatting:
Send messages and see them appear instantly in the chat window.

Typing indicators show when others are typing.

Online status updates show which users are active.

Leave Room:
You can switch or leave rooms anytime; your messages remain saved in MongoDB.


🌐 Deployment Guide (Render)
Backend Deployment (Render)

Push your project to GitHub.

Go to Render Dashboard
Build Command:npm install
Start Command:pnm start


Frontend Deployment (Render or Vercel)

If using Render:

Set Root Directory: frontend

Build Command:npm run build
Publish Directory:dist
