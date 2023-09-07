import React, { useState } from 'react';
import TS_username from './TS_username';
import TS_chat from './TS_chat';

const TS_Wrapper: React.FC = () => {

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>();
  const [username, setUsername] = useState<string>(''); // Store the username in the state
  
  const handleUsernameAvailable = (available: boolean) => {
    setUsernameAvailable(available);
  };

  const handleUsernameSet = (username: string) => {
    setUsername(username); // Save the username in the state when it's set
  };

  const renderComponent = () => {
    if (usernameAvailable === true) {
      return <> 
              <div className='flex items-center justify-center'>
                <TS_chat username={username} />
              </div>
            </>
    } else {
      return <> 
              <div className='flex items-center justify-center h-[92vh]'>
                <TS_username onUsernameSet={handleUsernameSet} onUsernameAvailable={handleUsernameAvailable} usernameAvailable={usernameAvailable} />
              </div>
            </>
            
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

export default TS_Wrapper;
