import React, { useEffect, useState, useContext } from 'react';
import { LastUpdatedContext } from '../contexts/LastUpdatedContext';
import { getSocket, FETCH_TIMEOUT } from '../helpers/sockets';
import { getIcon } from '../helpers/weather';

const WeatherIcon: React.FC = () => {
  const { setLastUpdated } = useContext(LastUpdatedContext);
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    let socketCleanup: () => void;

    const initializeSocket = async () => {
      try {
        const socket = await getSocket();
        if (socket) {
          socket.on('weather', (weather: any) => {
            if (weather) {
              setIcon(getIcon(weather));
              setLastUpdated();
            }
          });

          socket.emit('get weather');

          const interval = setInterval(() => socket.emit('get weather'), FETCH_TIMEOUT);

          socketCleanup = () => {
            socket.off('weather');
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
  }, [setLastUpdated]);

  return (
    <div id="weather" className="icon">
      {icon && <img alt="" src={`/img/${icon}.svg`} />}
    </div>
  );
};

export default WeatherIcon;
