import React, { useState, ChangeEvent } from 'react';
import './UpDownInput.scss';
import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';

interface UpDownInputProps {
  aboutUser?: boolean;
  onSelect: (value: number) => void;
}

const UpDownInput = ({ aboutUser = false, onSelect }: UpDownInputProps) => {
  const [count, setCount] = useState(aboutUser ? 4 : 16);

  const handleCount = (type: string) => {
    let newCount = count;
    const number = aboutUser ? 1 : 8;
    if (type === 'plus') {
      newCount = count + number;
    } else if (type === 'minus' && count > (aboutUser ? 4 : 16)) {
      newCount = count - number;
    }
    setCount(newCount);
    onSelect(newCount);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue !== 0) {
      setCount(newValue);
      onSelect(newValue);
    }
  };
  return (
    <div className="up-down">
      <input
        className="up-down__input"
        type="number"
        value={count}
        onChange={handleInputChange}
      />
      <div className="up-down__button">
        <button
          className="up-down__button__plus"
          type="button"
          onClick={() => handleCount('plus')}
        >
          <PlusIcon />
        </button>
        <button
          className="up-down__button__minus"
          type="button"
          onClick={() => handleCount('minus')}
        >
          <MinusIcon />
        </button>
      </div>
    </div>
  );
};

export default UpDownInput;
