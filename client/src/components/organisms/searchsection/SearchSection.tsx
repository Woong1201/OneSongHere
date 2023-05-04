import { GenreButtonList } from 'components/molecules/searchsection/GenreButtonList';
import SearchBar from 'components/molecules/searchsection/SearchBar';
import './SearchSection.scss';

const SearchSection = () => {
  return (
    <div className="search-section">
      <div className="search-section__buttons">
        <GenreButtonList />
      </div>
      <div className="search-section__search-bar">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchSection;
