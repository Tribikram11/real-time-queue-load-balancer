const sessionService = require("../services/session.service");
const queueStore = require("../core/queueStore")
const {agentManager} = require("../core/agentManager");


class metricEngine{
    constructor(){
        this.limit = 20;// window size 
        this.DEFAULT_SERVICE_TIME = 5 * 60 * 1000; // in ms

    }
    async calculateAvgServiceTime() {

        const sessions = await sessionService.getRecentSession(this.limit);

        if(!sessions || sessions.length === 0){
            return DEFAULT_SERVICE_TIME;
        }

        let totalDuration = 0;

        for (const session of sessions) {
            totalDuration += session.totalDuration; 
        }
        const avgServiceTime = totalDuration / sessions.length;

        return avgServiceTime;
    }


    async predictWaitTime(){
        const queuelength = queueStore.size();
        const activeAgents = agentManager.getActiveAgentsCount();

        if(activeAgents === 0){
            return {
                queuelength,
                activeAgents,
                avgServiceTime: null,
                estimatedWaitingTime: null,
                status: "UNAVAILABLE"
            };
        }

        const avgServiceTime = await this.calculateAvgServiceTime();
        const estimatedWaitingTime = (queuelength * avgServiceTime) / activeAgents;

        return {
                queuelength,
                activeAgents,
                avgServiceTime,
                estimatedWaitingTime,
                status: "OK",
            };
    }    
}


module.exports = new metricEngine();
