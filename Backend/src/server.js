require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const initSocket = require("./sockets");

// Connect to DB
connectDB(process.env.TZ);

// Create HTTP server
const server = http.createServer(app);

// Init socket.io
const io = initSocket(server);

// Make io available in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
