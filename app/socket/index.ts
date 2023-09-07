import { Server, Socket } from 'socket.io';

interface MySocket extends Socket {
  username?: string;
}


export const createSocketServer = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const usernames = new Map<string, boolean>(); // Store the usernames in a Map

  io.on('connection', (socket: MySocket) => {
    console.log('a user connected:', socket.id);

    socket.on('username', (username) => {
      console.log('username:', username);
      if (!usernames.has(username)) {
        // If the username is not already in use
        socket.username = username;
        usernames.set(username, true); // Add the username to the Map
        socket.emit('username_available', true); // Send "true" to the emitter
      } else {
        // If the username is already in use
        socket.emit('username_available', false); // Send "false" to the emitter
      }
    });

    socket.on('join_room', async (room: string) => {

        socket.join(room);

        // Get the list of users in the room
        const usersInRoom = [];
        const socketIdsInRoom = io.sockets.adapter.rooms.get(room) || new Set<string>();
        for (const socketId of socketIdsInRoom) {
            const userSocket = io.sockets.sockets.get(socketId) as MySocket;
            if (userSocket.username) {
                usersInRoom.push(userSocket.username);
            }
        }

        socket.emit('joined_room', room);
        socket.emit('users_in_room', room, usersInRoom);

        // emit to all clients except sender
        socket.broadcast.to(room).emit('user_joined', room, socket.username);
    });

    socket.on('leaving_room', (room) => {
        socket.leave(room);
        socket.emit('left_room', room);
        socket.broadcast.to(room).emit('user_left', room, socket.username);
    });

    socket.on('message', (message) => {
        io.in(message.room).emit('message_received', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
      const username = socket.username;
      if (username) {
        usernames.delete(username); // Remove the username from the Map
      }
    });
  });

  return io;
};
