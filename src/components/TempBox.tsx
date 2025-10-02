import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LastUpdatedContext } from '../contexts/LastUpdatedContext';
import { getSocket, FETCH_TIMEOUT } from '../helpers/sockets';

const extrapolateSauna = (temp: number) => Math.round(temp);
const getSaunaColor = (temp: number) => (temp > 55 ? 'red' : temp > 34 ? 'yellow' : '');

interface TempBoxProps {
  code: string | null;
  name: string | null;
  sauna?: boolean;
}

const TempBox: React.FC<TempBoxProps> = ({ code, name }) => {
  const { setLastUpdated } = useContext(LastUpdatedContext);
  const [temp, setTemp] = useState<number | null>(null);
  const [sauna, setSauna] = useState<boolean>(false);
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

  useEffect(() => {
    if (name && name.toLowerCase().includes('sauna')) {
      setSauna(true);
    }
  }, [name]);

  if (!code) {
    return (
      <div className="col">
        <div className="area" />
      </div>
    );
  }

  const handleClick = () => navigate(`/tags/${code}`);

  return (
    <div className="col" role="button" tabIndex={0} onClick={handleClick}>
      <div className={`area ${sauna && temp !== null ? getSaunaColor(temp) : ''} tempbox-area`}>
        <span className="location center">{name}</span>
        {temp !== null && (
          <span className="temp center">
            {sauna ? extrapolateSauna(temp) : Math.round(temp)}&deg;
          </span>
        )}
      </div>
    </div>
  );
};

export default TempBox;
