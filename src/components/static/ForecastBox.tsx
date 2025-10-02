import React from 'react';
import { getIcon } from '../../helpers/weather';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = `0${date.getHours()}`.slice(-2);
  return `${DAYS_OF_WEEK[date.getDay()]} ${hours}`;
};

interface ForecastEvent {
  icon?: string;
  temp?: number;
  date?: string;
}

interface ForecastBoxProps {
  event: ForecastEvent;
}

const ForecastBox: React.FC<ForecastBoxProps> = ({ event }) => {
  return (
    <div className="col forecast-box">
      {event.icon && (
        <div className="icon center">
          <img alt="" src={`/img/${getIcon(event)}.svg`} />
        </div>
      )}
      {event.temp !== undefined && (
        <span className="temp center">{Math.round(event.temp)}&deg;</span>
      )}
      {event.date && (
        <span className="time center">{formatDate(event.date)}</span>
      )}
    </div>
  );
};

export default ForecastBox;
