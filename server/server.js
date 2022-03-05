const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  socket.on('join_room', (data) => {
  
    socket.join(data)
    console.log(data, socket.id, 'paso por el server')
    io.emit('join_room',  data); // This will emit the event to all connected sockets
  })
  
})


server.listen(3001, () => {
  console.log(`Server Socket listening on port 3001`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})
