import React, { useEffect } from "react";
import { useSocket } from "../../SocketContext";

const Test2: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {

    if (socket) {
      socket.on("some-event", (data) => {
        console.log("Received data from the server:", data);
      });
      console.log("Socket is connected2");
      console.log(socket);
    }
    
  }, [socket]);

  return (
    <div>
      <h1>My Component</h1>
      {/* Your component content */}
    </div>
  );
};

export default Test2;
