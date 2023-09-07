import React, { useEffect } from "react";
import { useSocket } from "../../SocketContext";

const MyComponent: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {

    if (socket) {
      socket.on("some-event", (data) => {
        console.log("Received data from the server:", data);
      });
      console.log("Socket is connected");
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

export default MyComponent;
