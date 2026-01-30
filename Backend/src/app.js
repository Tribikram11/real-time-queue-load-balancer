const express = require("express");

// const userRoutes = require("./routes/user.routes");
// const agentRoutes = require("./routes/agent.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/agents", agentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Queue Load Balancer API running");
});

module.exports = app;
