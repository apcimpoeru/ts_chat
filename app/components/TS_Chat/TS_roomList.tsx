import React, { useContext, useEffect, useState } from 'react';
import { useSocket } from '../../SocketContext';

interface Room {
  name: string;
}

interface Props {
  onRoomClick: (roomName: string) => void;
  activeRoom: string | null;
  onRoomLeft: (roomName: string) => void;
}

const TS_roomList: React.FC<Props> = ({ onRoomClick, activeRoom, onRoomLeft }) => {
  const socket = useSocket();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const onJoinedRoom = (roomName: string) => {
      setRooms((prevRooms) => {
        if (!prevRooms.some((room) => room.name === roomName)) {
          return [...prevRooms, { name: roomName }];
        }
        return prevRooms;
      });
    };

    const onRoomCreated = (roomName: string) => {
      setRooms((prevRooms) => {
        if (!prevRooms.some((room) => room.name === roomName)) {
          return [...prevRooms, { name: roomName }];
        }
        return prevRooms;
      });
    };

    socket?.on('joined_room', onJoinedRoom);
    socket?.on('room_created', onRoomCreated);

    return () => {
      socket?.off('joined_room', onJoinedRoom);
      socket?.off('room_created', onRoomCreated);
    };
  }, [socket]);

  const leaveRoom = (roomName: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to the parent element
    socket?.emit('leaving_room', roomName);
    setRooms((prevRooms) => prevRooms.filter((room) => room.name !== roomName));
    onRoomLeft(roomName);
  };

  const handleClick = (roomName: string) => {
    onRoomClick(roomName);
  };

  return (
    <ul>
      {rooms.map((room) => (
        <li 
          key={room.name} 
          onClick={() => handleClick(room.name)}
          style={{ fontWeight: room.name === activeRoom ? 'bold' : 'normal' }}  // Use the activeRoom prop to determine the room to highlight
        >
          {room.name}{' '}
          <button onClick={(event) => leaveRoom(room.name, event)}>&times;</button>
        </li>
      ))}
    </ul>
  );
};

export default TS_roomList;
