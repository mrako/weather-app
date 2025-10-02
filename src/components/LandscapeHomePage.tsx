import React from 'react';
import Temperature from './Temperature';
import TempBox from './TempBox';
import ForecastBoxes from './ForecastBoxes';
import CurrentTime from './static/CurrentTime';
import WeatherIcon from './WeatherIcon';
import LastUpdated from './static/LastUpdated';

import { Tag } from '../types';

const maxForecastBoxesByWidth = () => Math.max(5, Math.ceil(window.innerWidth / 230));

interface LandscapeHomePageProps {
  tags: Tag[] | null;
}

const LandscapeHomePage: React.FC<LandscapeHomePageProps> = ({ tags }) => (
  <div className="flex">
    <div className="column-left">
      <CurrentTime />
      <WeatherIcon />
    </div>
    <div className="column-right">
      <div className="column-right-top">
        {tags && tags[0] && <Temperature code={tags[0].code} />}
      </div>
      <div className="column-right-middle">
        <ForecastBoxes max={maxForecastBoxesByWidth()} />
      </div>
      <div className="column-right-bottom">
        {tags?.slice(1, 4).map((tag, index) => (
          <TempBox key={index} code={tag.code} name={tag.name} sauna={false}  />
        ))}
      </div>
    </div>
    <LastUpdated />
  </div>
);

export default LandscapeHomePage;
