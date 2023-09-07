import React, { useState, useEffect } from 'react';
import { useSocket } from '../../SocketContext';

type TS_usernameProps = {
  onUsernameAvailable: (available: boolean) => void; //
  usernameAvailable: boolean | undefined;
  onUsernameSet: (username: string) => void; 
};

const TS_username: React.FC<TS_usernameProps> = ({ onUsernameAvailable, usernameAvailable, onUsernameSet }) => {
  const [username, setUsername] = useState('');
  const socket = useSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket?.emit('username', username); 
    onUsernameSet(username);
  };

  useEffect(() => {
    const handleUsernameAvailable = (available: boolean) => {
      onUsernameAvailable(available);
      
    };
    socket?.once('username_available', handleUsernameAvailable);

    return () => {
      socket?.off('username_available', handleUsernameAvailable); 
    };
  }, [socket, onUsernameAvailable]);

  return (
    <form className='flex' onSubmit={handleSubmit}>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      
      <button type="submit">Submit</button>
      {usernameAvailable !== undefined && (
        <div>{usernameAvailable ? 'Username available' : 'Username not available'}</div>
      )}
    </form>
  );
};

export default TS_username;
