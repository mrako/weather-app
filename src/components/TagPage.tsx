import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

import Button from './static/Button';
import { getSocket } from '../helpers/sockets';

const TagPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  const [temp, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pressure, setPressure] = useState([]);
  const socketRef = React.useRef<any>(null);

  useEffect(() => {
    let socketCleanup: () => void;

    const initializeSocket = async () => {
      try {
        const socket = await getSocket();
        if (socket) {
          socketRef.current = socket;

          socket.on('temp history', (data) => setTemp(data));
          socket.on('humidity history', (data) => setHumidity(data));
          socket.on('pressure history', (data) => setPressure(data));

          socket.emit('get temp history', code);
          socket.emit('get humidity history', code);
          socket.emit('get pressure history', code);

          socketCleanup = () => {
            socket.off('temp history');
            socket.off('humidity history');
            socket.off('pressure history');
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
  }, [code]);

  return (
    <div className="temp-chart">
      {temp && temp.length > 0 && (
        <div className="row">
          <h2>Lämpötila</h2>
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={temp} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="time" interval={11} tickFormatter={(time) => new Date(time).getHours().toString().padStart(2, '0')} />
              <YAxis interval={0} domain={['auto', 'auto']} width={25} tick={{ fontSize: '10px' }} />
              <Line dataKey="temp" isAnimationActive={false} dot={false} type="monotone" stroke="#fff" strokeWidth={1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {humidity && humidity.length > 0 && (
        <div className="row">
          <h2>Ilmankosteus</h2>
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={humidity} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="time" interval={11} tickFormatter={(time) => new Date(time).getHours().toString().padStart(2, '0')} />
              <YAxis interval={0} domain={['auto', 'auto']} width={25} tick={{ fontSize: '10px' }} />
              <Line dataKey="humidity" isAnimationActive={false} dot={false} type="monotone" stroke="#fff" strokeWidth={1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {pressure && pressure.length > 0 && (
        <div className="row">
          <h2>Ilmanpaine</h2>
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={pressure} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="time" interval={11} tickFormatter={(time) => new Date(time).getHours().toString().padStart(2, '0')} />
              <YAxis interval={0} domain={['auto', 'auto']} width={25} tick={{ fontSize: '10px' }} />
              <Line dataKey="pressure" isAnimationActive={false} dot={false} type="monotone" stroke="#fff" strokeWidth={1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}


      <div className="back-button">
        <Button target="/" name="&lt; back" />
      </div>
    </div>
  );
};

export default TagPage;
