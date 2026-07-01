import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import SuperJSON from "superjson";
import { GameEngine } from "lib";
import { getRoom, addConnection } from "./websockets/roomManager.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Express server is healthy" });
});

// 2. Wrap the Express app in a native NodeJS HTTP server
// This is required because the standard ws library needs raw access to the HTTP handshake
const server = createServer(app);

// 3. Attach the WebSocket Server to our HTTP server
const wss = new WebSocketServer({ noServer: true });

// Handle the HTTP upgrade request manually so it hooks into the same port
server.on("upgrade", (request, socket, head) => {
  console.log(`🔍 Received connection handshake request for: ${request.url}`);
  const url = new URL(request.url || "", `http://${request.headers.host}`);

  // Check if the connection request is specifically matching our /ws route
  if (url.pathname === "/game-ws") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy(); // Reject non-websocket upgrade connections
  }
});

// 4. Handle WebSocket Connection Connections
wss.on("connection", (ws: WebSocket) => {
  const roomId = "lobby"; // Default room for testing
  console.log("🔌 A player connected via WebSocket");

  // 1. Initialize the room and engine instance if it doesn't exist
  const room = getRoom(roomId);
  //TODO, add logic to capture if new person joining room, then can send event to everyone else in room
  addConnection(room, ws);

  // // 2. Send the initial snapshot to the client
  // // 填入: Call your serialization method here (e.g., room.engineInstance.toJSON())
  // const initialSnapshot = {};
  // ws.send(
  //   JSON.stringify({
  //     type: "ROOM_STATE_UPDATE",
  //     payload: initialSnapshot,
  //   }),
  // );

  // Listen for incoming messages from clients
  ws.on("message", (messageBuffer) => {
    console.log("⚡ A client successfully completed the handshake!");
    try {
      const action = JSON.parse(messageBuffer.toString());

      //TODO action - start new game
      switch (action.type) {
        case "START_NEW_GAME":
          room.gameState = new GameEngine();

          break;

        default:
          break;
      }
      // Broadcast updated state to all players in the room
      const broadcastPayload = SuperJSON.stringify({
        type: "ROOM_STATE_UPDATE",
        payload: room.gameState,
      });

      console.log("broadCastPayload", broadcastPayload);
      room.connections.forEach((client) => {
        if (client.readyState === 1) client.send(broadcastPayload);
      });
    } catch (err) {
      console.log("error");
    }
  });

  ws.on("close", () => {
    console.log("❌ Player disconnected");
  });
});

// 5. Start the unified server
server.listen(port, () => {
  console.log(`🚀 Server is blasting off at http://localhost:${port}`);
});
