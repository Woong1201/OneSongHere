import SearchSection from 'components/organisms/searchsection/SearchSection';
import StudioList from 'components/organisms/studiolist/StudioList';
import './Relay.scss';

const Relay = () => {
  return (
    <div className="relay-page">
      <div className="relay-page__search-section">
        <SearchSection />
      </div>
      <div className="relay-page__studio-list">
        <StudioList isParticipating />
      </div>
      <div className="relay-page__line" />
      <div className="relay-page__studio-list-all">
        <StudioList isParticipating={false} />
      </div>
    </div>
  );
};

export default Relay;
