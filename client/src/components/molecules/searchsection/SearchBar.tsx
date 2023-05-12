import React, { useEffect, useState } from 'react';
import './SearchBar.scss';
import SearchIcon from '../../../assets/images/icon/search_icon.svg';
import TextInput from '../../atoms/inputs/TextInput';

interface SearchBarProps {
  onChangeSearchType: () => void;
  onChangeKeyword: (word: string) => void;
}

const SearchBar = ({ onChangeSearchType, onChangeKeyword }: SearchBarProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const search = () => {
    onChangeSearchType();
    onChangeKeyword(keyword);
  };

  return (
    <div className="search-bar">
      <TextInput
        label="검색어를 입력해주세요"
        value={keyword}
        onChange={onChange}
        doSearch={search}
      />
      <button type="button" onClick={search} className="search-bar__icon">
        <img src={SearchIcon} alt="icon" />
      </button>
    </div>
  );
};

export default SearchBar;
