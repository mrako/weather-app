import React, { useEffect, useState } from 'react';

const DAYS_OF_WEEK = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="currenttime">
      <span className="time">
        {time.getHours()}:{`0${time.getMinutes()}`.slice(-2)}
      </span>
      <span className="date">
        {DAYS_OF_WEEK[time.getDay()]} {time.getDate()}.{time.getMonth() + 1}.
      </span>
    </div>
  );
};

export default CurrentTime;
