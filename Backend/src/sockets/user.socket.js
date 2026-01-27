const events = require("../constants/events")

function userSocket(socket , io){
    console.log("user connected: ", socket.id)

    socket.on("disconnect", () => {
        console.log(" user disconnected", socket.id);
    });
}

MediaSourceHandle.exports = userSocket;
