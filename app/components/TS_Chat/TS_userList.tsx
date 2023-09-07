import React, { useState, useEffect } from 'react';
import { useSocket } from '../../SocketContext';

interface TS_userListProps {
  activeRoom: string | null;
}

export default function TS_userList({ activeRoom }: TS_userListProps) {
  const socket = useSocket();
  const [userLists, setUserLists] = useState<Map<string, string[]>>(new Map());

  useEffect(() => {
    //console.log('active room changed', activeRoom);
    //console.log('userLists', userLists);
  }, [activeRoom] );

  useEffect(() => {
    if (!socket) return;

    const handleUsersInRoom = (room: string, users: string[]) => {
      setUserLists((prevUserLists) => {
        const newUserLists = new Map(prevUserLists);
        newUserLists.set(room, users);
        return newUserLists;
      });
    };

    const handleUserJoined = (room: string, username: string) => {
      setUserLists((prevUserLists) => {
        if (prevUserLists.has(room)) {
          const newUserLists = new Map(prevUserLists);
          const users = newUserLists.get(room)!;
          users.push(username);
          newUserLists.set(room, users);
          return newUserLists;
        }
        return prevUserLists;
      });
    };

    const handleUserLeft = (room: string, username: string) => {
      setUserLists((prevUserLists) => {
        if (prevUserLists.has(room)) {
          const newUserLists = new Map(prevUserLists);
          const users = newUserLists.get(room)!;
          const filteredUsers = users.filter((user) => user !== username);
          newUserLists.set(room, filteredUsers);
          return newUserLists;
        }
        return prevUserLists;
      });
    };

    socket.on('users_in_room', handleUsersInRoom);
    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);

    return () => {
      socket.off('users_in_room', handleUsersInRoom);
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
    };
  }, [socket]);

  return (
    <div className='text-center'>
      {activeRoom && userLists.has(activeRoom) ? (
        <ul>
          <p>User list for room: {activeRoom}</p>
          {userLists.get(activeRoom)!.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No users in the room.</p>
      )}
    </div>
  );
}
