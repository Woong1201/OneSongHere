import React from 'react';
import './LoginButton.scss';

interface LoginButtonProps {
  label: string;
  type: string;
  src: string;
  onClick?: () => void;
}

const LoginButton = ({ label, type, src, ...props }: LoginButtonProps) => {
  return (
    <button
      className={['login-button', `login-button--${type}`].join(' ')}
      type="button"
      {...props}
    >
      <div className="login-button__img">
        <img src={src} alt="logo" />
      </div>
      <p>{label}</p>
    </button>
  );
};

export default LoginButton;
