const agent_status = {
    FREE: "FREE",
    BUSY: "BUSY",
    OFFLINE: "OFFLINE"
}

class agentManager {

    constructor() {
        this.agents = {};
    }

    addAgent(agentId) {
        if (!this.agents[agentId]) {
            this.agents[agentId] = {
                status: agent_status.FREE,
                currentUser: null,
                startedAt: null
            };
        }
        return this.agents[agentId];
    }


    getFreeAgent() {
        for (const agentId in this.agents) {
            if (this.agents[agentId] === agent_status.FREE) {
                return agentId;
            }

        }
        return null;
    }

    markBusy(agentId, userId) {
        const agent = this.agents[agentId];
        if (!agent) return;

        agent.status = agent_status.BUSY;
        agent.currentUser = userId;
        agent.startedAt = Date.now();

    }

    markFree(agentId) {
        const agent = this.agents[agentId];
        if (!agent) return;

        agent.status = agent_status.FREE;
        agent.currentUser = null;
        agent.startedAt = null;

    }

    markOffline(agentId) {
        const agent = this.agents[agentId];
        if (!agent) return;

        let reassignUser = null;

        if (agent.status === agent_status.BUSY) {
            reassignUser = agent.currentUser;
        }

        agent.status = AGENT_STATUS.OFFLINE;
        agent.currentUser = null;
        agent.startedAt = null;

        return reassignUser;

    }

    getActiveAgentsCount() {
        return Object.values(this.agents).filter(
            (agent) => agent.status !== agent_status.OFFLINE 
        ).length;
    }

    getAllAgents() {
    return { ...this.agents };
  }
}

module.exports = {
  agentManager: new agentManager(),
  agent_status
};

