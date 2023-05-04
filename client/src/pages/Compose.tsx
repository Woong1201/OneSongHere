import SearchSection from 'components/organisms/searchsection/SearchSection';
import './Compose.scss';
import StudioList from 'components/organisms/studiolist/StudioList';

const Compose = () => {
  return (
    <div className="compose-page">
      <div className="compose-page__search-section">
        <SearchSection />
      </div>
      <div className="compose-page__studio-list">
        <StudioList />
      </div>
    </div>
  );
};

export default Compose;
