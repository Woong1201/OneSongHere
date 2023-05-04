import React from 'react';
import './TextInput.scss';

interface TextInputProps {
  label: string;
  value: string;
  stroke?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInput = ({
  label,
  value,
  stroke = false,
  ...props
}: TextInputProps) => {
  const border = stroke ? 'text-input--border' : null;
  return (
    <input
      type="text"
      placeholder={label}
      className={['text-input', border].join(' ')}
      value={value}
      {...props}
    />
  );
};

export default TextInput;
