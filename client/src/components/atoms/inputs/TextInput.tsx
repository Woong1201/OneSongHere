import React from 'react';
import './TextInput.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}
export const TextInput = ({ label, ...props }: ButtonProps) => {
  return (
    <input type="text" placeholder={label} className="text-input" {...props} />
  );
};
