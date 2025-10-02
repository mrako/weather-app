import React, { useContext } from 'react';
import { LastUpdatedContext } from '../../contexts/LastUpdatedContext';

const LastUpdated: React.FC = () => {
  const { lastUpdated } = useContext(LastUpdatedContext);

  if (!lastUpdated) {
    return <div id="lastupdated">Last updated: N/A</div>;
  }

  return (
    <div id="lastupdated">
      last updated {lastUpdated.getHours()}:{`0${lastUpdated.getMinutes()}`.slice(-2)}
    </div>
  );
};

export default LastUpdated;
