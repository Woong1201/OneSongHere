import React, { useState } from 'react';
import './SearchBar.scss';
import SearchIcon from '../../../assets/images/icon/search_icon.svg';
import { TextInput } from '../../atoms/inputs/TextInput';

interface SearchBarProps {
  label: string;
  onClick?: () => void;
}

const SearchBar = ({ label, onClick }: SearchBarProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div className="search-bar">
      <TextInput label={label} value={keyword} onChange={onChange} />
      <button type="button" onClick={onClick} className="search-bar__icon">
        <img src={SearchIcon} alt="icon" />
      </button>
    </div>
  );
};

export default SearchBar;
