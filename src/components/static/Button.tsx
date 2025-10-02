import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  target: string;
  name: string;
}

const Button: React.FC<ButtonProps> = ({ target, name }) => {
  return (
    <div id="settings">
      <Link to={target}>{name}</Link>
    </div>
  );
};

export default Button;
