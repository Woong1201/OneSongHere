import GenreButtonList from 'components/molecules/searchsection/GenreButtonList';
import SearchBar from 'components/molecules/searchsection/SearchBar';
import './SearchSection.scss';

interface SearchSectionProps {
  onChangeSearchType: (type: string) => void;
  onChangeKeyword: (word: string) => void;
}

const SearchSection = ({
  onChangeSearchType,
  onChangeKeyword,
}: SearchSectionProps) => {
  return (
    <div className="search-section">
      <div className="search-section__buttons">
        <GenreButtonList
          onChangeSearchType={() => onChangeSearchType('TAG')}
          onChangeKeyword={onChangeKeyword}
        />
      </div>
      <div className="search-section__search-bar">
        <SearchBar
          onChangeSearchType={() => onChangeSearchType('TITLE')}
          onChangeKeyword={onChangeKeyword}
        />
      </div>
    </div>
  );
};

export default SearchSection;
