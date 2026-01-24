const { agentManager } = require("./agentManager");
const queueStore = require("./queueStore");

class QueueEngine {
    handleUserJoin(userId) {
        const freeAgentId = agentManager.getFreeAgent();

        if (freeAgentId) {
            agentManager.markBusy(freeAgentId, userId);

            return {
                status: "ASSIGNED",
                agentId: freeAgentId,
                userId
            }

        } else {
            queueStore.enqueue({userId});

            return {
                status: "QUEUED",
                position: queueStore.size(),
                userId
            }
        }

    }

    handleFreeAgent(agentId) {
        agentManager.markFree(agentId)

        const nextUser = queueStore.dequeue();

        if (!nextUser) {
            return null;
        }

        agentManager.markBusy(agentId, nextUser.userId);

        return {
            status: "ASSIGNED",
            agentId: agentId,
            userId: nextUser.userId
        }
    }

    handleOfflineAgent(agentId) {
        const userId = agentManager.markOffline(agentId);

        if (userId) {
            queueStore.enqueue(userId);

            return {
                status: "REQUEUED",
                userId: userId
            }
        }
        return null;
    }

    getSystemState() {
        return {
            queuelength: queueStore.size(),
            agents: agentManager.getAllAgents()
        }

    }
}


module.exports = new QueueEngine();
