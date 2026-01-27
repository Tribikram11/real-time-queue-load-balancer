const queueEngine = require("../core/queueEngine");
const events = require("../constants/events")

function adminSocket(socket, io){
    const systemState = queueEngine.getSystemState();
    socket.emit(events.SYSTEM_STATE, systemState);

    socket.on("disconnected", () => {
        console.log("Admin disconnected: ", socket.id);
    })
}

module.exports = adminSocket;