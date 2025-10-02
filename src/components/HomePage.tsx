import React, { useState, useEffect } from 'react';
import LandscapeHomePage from './LandscapeHomePage';
import PortraitHomePage from './PortraitHomePage';
import { useAuth } from '../contexts/AuthContext';
import { get } from '../helpers/api';

import { Tag } from '../types';

const HomePage: React.FC = () => {
  const { state: { user } } = useAuth();
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    if (user) {
      get('tags').then(setTags);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [user]);

  if (!user) return null;

  const { width, height } = dimensions;

  if (width <= height) {
    return <PortraitHomePage tags={tags} />;
  }
  return <LandscapeHomePage tags={tags} />;
};

export default HomePage;
