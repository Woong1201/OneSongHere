import React, { useState, ChangeEvent } from 'react';
import './UpDownInput.scss';
import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';

interface UpDownInputProps {
  aboutUser?: boolean;
  onSelect: (value: number) => void;
}

const UpDownInput = ({ aboutUser = false, onSelect }: UpDownInputProps) => {
  const [count, setCount] = useState(aboutUser ? 3 : 16);

  const handleCount = (type: string) => {
    let newCount = count;
    const number = aboutUser ? 1 : 4;
    if (type === 'plus' && count < (aboutUser ? 6 : 32)) {
      newCount = count + number;
    } else if (type === 'minus' && count > (aboutUser ? 3 : 16)) {
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
      <div className="up-down__container">
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
    </div>
  );
};

export default UpDownInput;
