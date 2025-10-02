import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoggedInRoute from './components/auth/LoggedInRoute';
import LoginPage from './components/auth/LoginPage';
import LogoutPage from './components/auth/LogoutPage';

import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import TagPage from './components/TagPage';

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<LoggedInRoute component={HomePage} />} />
    <Route path="/settings" element={<LoggedInRoute component={SettingsPage} />} />
    <Route path="/tags/:code" element={<LoggedInRoute component={TagPage} />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/logout" element={<LogoutPage />} />
  </Routes>
);

export default Router;
