import React from 'react';
import './Button.scss';

interface ButtonProps {
  tag?: boolean;
  color?: 'primary' | 'other' | 'main';
  label: string;
  shadow?: boolean;
  type: 'button' | 'submit';
  onClick?: () => void;
}

export const Button = ({
  tag = false,
  color = 'other',
  shadow = false,
  type,
  label,
  ...props
}: ButtonProps) => {
  const mode = tag ? 'button--tag' : 'button--flat';
  const border = shadow ? 'button--shadow' : null;
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={['button', `button--${color}`, mode, border].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
