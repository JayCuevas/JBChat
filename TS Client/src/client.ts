import io from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/chat", query: "Test" });

socket.connect();
socket.send("hello");
