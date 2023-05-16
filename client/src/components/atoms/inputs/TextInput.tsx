import React, { ChangeEvent, useState } from 'react';
import './TextInput.scss';

interface TextInputProps {
  label: string;
  value: string | number;
  short?: boolean;
  stroke?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  doSearch?: () => void;
  width?: number;
}
const TextInput = ({
  label,
  value,
  short = false,
  stroke = false,
  doSearch,
  width = 400,
  ...props
}: TextInputProps) => {
  const border = stroke ? 'text-input--border' : null;
  const size = short ? 'text-input--short' : null;
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && doSearch) {
      doSearch();
    }
  };
  return (
    <input
      type="text"
      placeholder={label}
      className={['text-input', border, size].join(' ')}
      style={{ width: `${width}px` }}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleEnter}
      {...props}
    />
  );
};

export default TextInput;
