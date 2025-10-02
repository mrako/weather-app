import React, { useEffect, useState, useContext } from 'react';
import { LastUpdatedContext } from '../contexts/LastUpdatedContext'; // Adjust path as per project structure
import ForecastBox from './static/ForecastBox';
import { getSocket, FETCH_TIMEOUT } from '../helpers/sockets';

const MAX_ELEMENTS = 24;
const MAX_ELEMENTS_VISIBLE = 5;

const calculateElementsWidth = (elementsLength: number): number =>
  (window.innerWidth / MAX_ELEMENTS_VISIBLE) * elementsLength;

interface Forecast {
  date: string;
  [key: string]: any;
}

interface ForecastBoxesProps {
  max?: number;
}

const ForecastBoxes: React.FC<ForecastBoxesProps> = ({ max }) => {
  const { setLastUpdated } = useContext(LastUpdatedContext);
  const [forecasts, setForecasts] = useState<Forecast[] | null>(null);

  useEffect(() => {
    let socketCleanup: () => void;

    const initializeSocket = async () => {
      try {
        const socket = await getSocket();
        if (socket) {

          socket.on('forecast', (data: Forecast[]) => {
            setForecasts(data);
            setLastUpdated();
          });

          socket.emit('get forecast');

          const interval = setInterval(() => socket.emit('get forecast'), FETCH_TIMEOUT);

          socketCleanup = () => {
            socket.off('forecast');
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

  if (!forecasts) return null;

  const elements = forecasts.slice(0, max || MAX_ELEMENTS);

  return (
    <div className="forecast">
      <ul style={{ width: !max ? calculateElementsWidth(elements.length) : undefined }}>
        {elements.map((event) => (
          <ForecastBox key={event.date} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default ForecastBoxes;
