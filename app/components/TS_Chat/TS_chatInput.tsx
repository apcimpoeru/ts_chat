import React, { useState } from 'react';
import { useSocket } from '../../SocketContext';

type TS_ChatInputProps = {
  activeRoom: string | null; // New prop for the active room
  username: string | null;
};

const TS_ChatInput: React.FC<TS_ChatInputProps> = ({  activeRoom , username}) => {

  const [message, setMessage] = useState('');
  const socket = useSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Emit the "message_sent" event with the username, active room and message data
    socket?.emit('message', { room: activeRoom, message, username });

    // Clear the input field after sending the message
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default TS_ChatInput;
