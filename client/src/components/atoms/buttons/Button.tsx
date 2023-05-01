import React from 'react';
import './Button.scss';

interface ButtonProps {
  tag?: boolean;
  color?: 'primary' | 'other' | 'main';
  label: string;
  shadow?: boolean;
  onClick?: () => void;
}
export const Button = ({
  tag = false,
  color = 'other',
  shadow = false,
  label,
  ...props
}: ButtonProps) => {
  const mode = tag ? 'button--tag' : 'button--flat';
  const border = shadow ? 'button--shadow' : null;
  return (
    <button
      type="button"
      className={['button', `button--${color}`, mode, border].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
