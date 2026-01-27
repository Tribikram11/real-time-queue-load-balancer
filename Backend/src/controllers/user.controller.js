const queueEngine = require("../core/queueEngine");
const events = require("../constants/events");

function userJoinController(req, res) {
    const {userId} = req.body;

    const result = queueEngine.handleUserJoin(userId);

    if(result.status === "ASSIGNED"){
        req.io.emit(events.USER_ASSIGNED, result);
        req.io.emit(events.AGENT_STATUS_CHANGED)
    }

    if(result.status === "QUEUED"){
        socket.emit(events.QUEUE_UPDATED)
    }

    res.json(result)
}


module.exports = userJoinController;