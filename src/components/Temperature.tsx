import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LastUpdatedContext } from '../contexts/LastUpdatedContext';
import { getSocket, FETCH_TIMEOUT } from '../helpers/sockets';

interface TemperatureProps {
  code: string | null;
}

const Temperature: React.FC<TemperatureProps> = ({ code }) => {
  const { setLastUpdated } = useContext(LastUpdatedContext);
  const [temp, setTemp] = useState<number | null>(null);
  const [battery, setBattery] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;

    let socketCleanup: () => void;

    const initializeSocket = async () => {
      try {
        const socket = await getSocket();
        if (socket) {
          socket.on(`current-${code}`, (current: any) => {
            if (current) {
              setTemp(current.temp);
              setBattery(current.battery);

              setLastUpdated();
            }
          });

          socket.emit('get current', { code });

          const interval = setInterval(() => socket.emit('get current', { code }), FETCH_TIMEOUT);

          socketCleanup = () => {
            socket.off(`current-${code}`);
            clearInterval(interval);
          };
        }
      } catch (error) {
        console.error('Socket connection error:', error);
      }
    };

    initializeSocket();

    return () => {
      if (socketCleanup) socketCleanup();
    };
  }, [code, setLastUpdated]);

  if (temp === null) return null;

  return (
    <div
      className="temperature tempbox-area"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/tags/${code}`)}
    >
      {battery !== null && battery < 3000 && (
        <span className="battery-indicator" />
      )}
      <span>{Math.round(temp)}&deg;</span>
    </div>
  );
};

export default Temperature;
