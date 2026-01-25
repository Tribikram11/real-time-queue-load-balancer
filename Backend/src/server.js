const http = require("http");
const app = require("./app");
const initSocket = require("./sockets");

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});

