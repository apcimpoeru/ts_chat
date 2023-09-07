import React from 'react';

interface ChatData {
  room: string;
  message: string;
  username: string;
}

interface TS_chatLogProps {
  data: ChatData[];
  username: string;
  activeRoom: string;
}

const TS_chatLog: React.FC<TS_chatLogProps> = ({ data, username, activeRoom }) => {
  const filteredData = data.filter((chat) => chat.room === activeRoom);

  return (
    <div>
      {filteredData.map((chat, index) => (
        <p key={index} style={{ fontWeight: chat.username === username ? 'bold' : 'normal' }}>
          <strong>{chat.username}: </strong>
          {chat.message}
        </p>
      ))}
    </div>
  );
};

export default TS_chatLog;
