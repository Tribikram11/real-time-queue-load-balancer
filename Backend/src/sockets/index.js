const {Server} = require("socket.io")
const userSocket = require("./user.socket");
const agentSocket = require("./agent.socket");
const adminSocket = require("./admin.socket");

function initSocket(server){
    const io = new Server( server, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        const{ role, id} = socket.handshake.query;

        console.log(`connected: id=${id}, role =${role}`)

        if(role === "user"){
            userSocket(socket, io);
        }

        if(role === "agent"){
            agentSocket(socket, io);
        }

        if(role === "admin"){
            adminSocket(socket, io);
        }

    });
    return io;
}

module.exports = initSocket;