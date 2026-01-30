const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    userId: String,
    agentId: String,
    startTime: Number,
    endTime: Number,
    duration: Number,
});


module.exports = mongoose.model("Session", newSchema);