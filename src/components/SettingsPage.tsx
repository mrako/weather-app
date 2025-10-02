import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Button from './static/Button';
import SortableTagList from './static/SortableTagList';
import { useAuth } from '../contexts/AuthContext';
import { get, put, logout } from '../helpers/api';

const SettingsPage: React.FC = () => {
  const { state: { user }, dispatch } = useAuth();
  const [tags, setTags] = useState<any[] | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    get('tags').then(setTags);
  }, [user]);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await logout();
    dispatch({ type: 'DELETE' });
    setError(error);
  };

  const handleTagSorting = async (sortedTags: any[]) => {
    const tagCodes = sortedTags.map(t => t.code);

    await put('users', { settings: { tags: tagCodes } });
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="full-size settings">
      {tags && <SortableTagList tags={tags} handleSorting={handleTagSorting} />}
      <form>
        {error && <p className="error">{error}</p>}
        <button id="logout" onClick={handleLogout}>LOGOUT</button>
      </form>
      <Button target="/" name="&lt; back" />
    </div>
  );
};

export default SettingsPage;
