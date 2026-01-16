/**
 * queueStore.js
 * ----------------
 * In-memory FIFO queue for waiting users.
 * This module is intentionally simple and isolated.
 */

class QueueStore {
  constructor() {
    // Internal queue (FIFO)
    this.queue = [];
  }

  /**
   * Add a user to the end of the queue
   * @param {Object} user - must contain userId
   */
  enqueue(user) {
    const queueEntry = {
      userId: user.userId,
      joinedAt: Date.now()
    };

    this.queue.push(queueEntry);
    return queueEntry;
  }

  /**
   * Remove and return the first user in the queue
   * @returns {Object|null}
   */
  dequeue() {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue.shift();
  }

  /**
   * View the first user without removing
   * @returns {Object|null}
   */
  peek() {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue[0];
  }

  /**
   * Get current queue size
   * @returns {number}
   */
  size() {
    return this.queue.length;
  }

  /**
   * Get full queue (read-only use)
   * @returns {Array}
   */
  getAll() {
    return [...this.queue];
  }

  /**
   * Clear queue (mainly for testing)
   */
  clear() {
    this.queue = [];
  }
}

// Export a SINGLE instance (singleton)
module.exports = new QueueStore();
