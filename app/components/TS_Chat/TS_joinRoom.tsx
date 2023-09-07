import React, { useState } from 'react';
import { useSocket } from '../../SocketContext';

interface Props {
  onJoinRoom: (roomName: string) => void;
}

const TS_joinRoom: React.FC<Props> = ({ onJoinRoom }) => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const socket = useSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomName.trim() === '') {
      setError('Room name cannot be empty');
      return;
    }
    socket?.emit('join_room', roomName);
    onJoinRoom(roomName);
    setRoomName('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
      </label>
      <button type="submit">Join Room</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default TS_joinRoom;
