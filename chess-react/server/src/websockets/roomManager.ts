import { GameEngine } from "../../../lib/services/GameEngine";
import { WebSocket } from "ws";
// Define what a match room keeps track of in server memory
interface GameRoom {
  roomId: string;
  gameState: GameEngine;
  connections: Set<any>; // Tracks active player WebSocket connections
}

// Global in-memory storage for active game rooms
export const gameRooms = new Map<string, GameRoom>();

export function getRoom(roomId: string) {
  if (!gameRooms.has(roomId)) {
    gameRooms.set(roomId, {
      roomId,
      gameState: new GameEngine(),
      connections: new Set(),
    });
  }

  return gameRooms.get(roomId)!;
}

export function addConnection(room: GameRoom, ws: WebSocket) {
  room.connections.add(ws);
}
