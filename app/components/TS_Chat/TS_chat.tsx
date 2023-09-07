import React, { useEffect, useState } from 'react';
import TS_joinRoom from './TS_joinRoom';
import TS_roomList from './TS_roomList';
import TS_userList from './TS_userList';
import TS_chatInput from './TS_chatInput'; 
import TS_chatLog from './TS_chatLog';
import { useSocket } from '../../SocketContext';

interface TS_ChatProps {
  username: string;
}

const TS_Chat: React.FC<TS_ChatProps> = ({ username }) => {

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [chatData, setChatData] = useState<{ room: string; message: string; username: string }[]>([]);

  const socket = useSocket();

  const handleRoomClick = (roomName: string) => {
    setSelectedRoom(roomName);
  };

  const handleJoinRoom = (roomName: string) => {
    setSelectedRoom(roomName);
  };

  const handleRoomLeft = (roomName: string) => {
    if (selectedRoom === roomName) {
      // setSelectedRoom(null);
    }
  };

  useEffect(() => {

    socket?.on('message_received', (message) => {
      setChatData((prevChatData) => [...prevChatData, message]);
    });

  }, [socket]);

  return (

    <div className='chatWrapper flex h-[92vh] w-[100%] justify-between'>

      <div className='joinRoom w-[20%] items-center text-center pt-[2vh]'>
        <TS_joinRoom onJoinRoom={handleJoinRoom} />
        <TS_roomList onRoomClick={handleRoomClick} activeRoom={selectedRoom} onRoomLeft={handleRoomLeft} />
      </div>

      {selectedRoom ? (
        <>
          <div className='chatLog self-end w-[60%] items-center text-center pb-[2vh]'>
            <TS_chatLog data={chatData} username={username} activeRoom={selectedRoom} />
            <TS_chatInput username={username} activeRoom={selectedRoom} /> {/* Pass selectedRoom to TS_chatInput */}
          </div>

          <div className='userList w-[20%] items-center pt-[2vh]'>
            <TS_userList activeRoom={selectedRoom} />
          </div>
        </>
      ) : (
        <p>Please select a room.</p>
      )}

    </div>

  );
}

export default TS_Chat