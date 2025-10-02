import React from 'react';
import Temperature from './Temperature';
import TempBox from './TempBox';
import ForecastBoxes from './ForecastBoxes';
import CurrentTime from './static/CurrentTime';
import WeatherIcon from './WeatherIcon';
import Button from './static/Button';
import LastUpdated from './static/LastUpdated';

import { Tag } from '../types';

interface PortraitHomePageProps {
  tags: Tag[] | null;
}

const PortraitHomePage: React.FC<PortraitHomePageProps> = ({ tags }) => (
  <div className="flex">
    <div className="portrait-top">
      <div className="portrait-top-left">
        <CurrentTime />
        <WeatherIcon />
      </div>
      <div className="portrait-top-right">
        {tags && tags[0] && <Temperature code={tags[0].code} />}
      </div>
    </div>
    <div className="portrait-middle">
      <ForecastBoxes />
    </div>
    <div className="portrait-bottom">
      { tags && tags[1] && <TempBox code={tags[1].code} name={tags[1].name} /> }
      { tags && tags[2] && <TempBox code={tags[2].code} name={tags[2].name} /> }
      { tags && tags[3] && <TempBox code={tags[3].code} name={tags[3].name} /> }
      { tags && tags[4] && <TempBox code={tags[4].code} name={tags[4].name} /> }
    </div>
    <Button target="/settings" name="Settings" />
    <LastUpdated />
  </div>
);

export default PortraitHomePage;
