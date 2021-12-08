const express = require("express");
const app = express();
const server = require("http").createServer(app); // setup and intilize socket.io server

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.send("sadas");
});
app.get("/home", (req, res) => {
    res.render("home");
    // res.sendFile(__dirname + '/home.html');
});

server.listen("3000", () => {
    console.log("Server Running...");
});

io.on("connection", (socket) => {
    console.log("User connected : ", socket.id);

    // this will use after the connection and this is event you can write emit of "message" event .
    socket.on("message", (data) => {                                                        // This will catch the data socket.on,( Wait for Someone emit for data)
        socket.broadcast.emit("message", data)      // show everyone of our message event data
    });
});
