import React, { useState } from 'react';
import './SelectBox.scss';

interface SelectBoxProps {
  onSelect: (value: number) => void;
}

const SelectBox = ({ onSelect }: SelectBoxProps) => {
  const numbers = Array.from({ length: 19 }, (_, i) => i + 2);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState('------');

  const handleSelect = (number: number) => {
    console.log(isOpen);
    setSelectValue(number.toString());
    onSelect(number);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(true);
    console.log(isOpen);
  };

  return (
    <div className={`select-box ${isOpen ? 'active' : ''}`}>
      <button type="button" className="select-box__label" onClick={toggleOpen}>
        {selectValue}
      </button>
      {isOpen && (
        <ul className="select-box__option-list">
          {numbers.map((number) => (
            <li
              role="presentation"
              key={number}
              className="select-box__option-item"
              onClick={() => {
                handleSelect(number);
              }}
            >
              {number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
