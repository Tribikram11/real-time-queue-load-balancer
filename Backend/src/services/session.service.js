const Session = require("../config/db");

class sessionService {
    constructor() {
        this.activeSession = {};
        // used to store active sessions in memory
    }

    /**
       * Start a new session when a user is assigned to an agent
       * @param {string} agentId
       * @param {string} userId
       */

    startSession(agentId, userId){
        const session = { 
            agentId,
            userId,
            startTime: Date.now()
        };

        this.activeSession[agentId] = session;
    }

    /**
     * @param {string } agentId
     * @returns {Object|null} completed session
     */

    async endSession(agentId){
        const session = this.activeSession[agentId];

        if(!session){
            return null;
        }

        const end_time = Date.now();

        const duration = end_time - session.startTime

        const completedSession = {
            agentId: session.agentId,
            userId: session.userId,
            startTime: session.startTime,
            end_time,
            duration
        }
        // save this to database for prediction 
        await Session.create(completedSession);
        // remove this from the active session 
        delete this.activeSession[agentId];

        return completedSession;
    }

    /**
     * @param {string } agentId
     *  Abort a session if agent goes offline mid-service and these are not saved to database
     * 
     */

    abortSession(agentId){
        const session  = this.activeSession[agentId];

        if(session){
            delete this.activeSession[agentId]
        }

        return ;
    }

    /**
   * Get recent completed sessions for metrics
   * @param {number} limit
   * @returns {Array}
   */

    async getRecentSession(limit = 20){
         return Session.find({})//find everything inside the session
                .sort({end_time: -1})//sort it in descending order show that the newest will appear at top
                .limit(limit)//cap the number of sessions we are going to use
                .lean()// return Plain Old JavaScript Objects (POJOs) which is faster and uses less memory
    }
}


module.exports = new sessionService();