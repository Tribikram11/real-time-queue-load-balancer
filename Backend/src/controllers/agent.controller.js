const queueEngine = require("../core/queueEngine");
const events = require("../constants/events")

function agentController(req, res){
    const {agentId} = req.body;

    const result = queueEngine.handleFreeAgent(agentId);

    req.io.emit(events.AGENT_STATUS_CHANGED);
    req.io.emit(events.QUEUE_UPDATED);

    if(result){
        req.io.emit(events.USER_ASSIGNED, result.userId)
    }

    res.json(result)
}


module.exports = agentController;