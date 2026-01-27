const events = require("../constants/events");
const queueEngine = require("../core/queueEngine");

function agentSocket(socket, io) {
    const agentId = socket.handshake.query.id;

    console.log("agent connected", agentId)
    
    socket.on("Disconnected", () => {
        console.log("agent disconnected", agentId);
       
        const result = queueEngine.handleOfflineAgent(agentId);

        if (result) {
            io.emit(events.QUEUE_UPDATED),
                io.emit(events.AGENT_STATUS_CHANGED)
        }


    })

}
module.exports = agentSocket;