import React, { useEffect, useState } from 'react';
import './SearchBar.scss';
import SearchIcon from 'components/atoms/common/SearchIcon';
import TextInput from '../../atoms/inputs/TextInput';

interface SearchBarProps {
  onChangeSearchType: () => void;
  onChangeKeyword: (word: string) => void;
  whiteMode?: boolean;
}

const SearchBar = ({
  onChangeSearchType,
  onChangeKeyword,
  whiteMode = false,
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const search = () => {
    onChangeSearchType();
    onChangeKeyword(keyword);
  };

  const colorTheme = whiteMode ? 'search-bar--white' : 'search-bar--default';
  const iconColor = whiteMode ? '#4642FF' : '#453F52';
  return (
    <div className={['search-bar', colorTheme].join(' ')}>
      <TextInput
        label="검색어를 입력해주세요"
        value={keyword}
        onChange={onChange}
        doSearch={search}
      />
      <button type="button" onClick={search} className="search-bar__icon">
        <SearchIcon color={iconColor} />
      </button>
    </div>
  );
};

export default SearchBar;
