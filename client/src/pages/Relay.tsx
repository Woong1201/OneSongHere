import SearchSection from 'components/organisms/searchsection/SearchSection';
import StudioList from 'components/organisms/studiolist/StudioList';
import './Relay.scss';
import { RelayStudio } from 'types/RelayStudio';
import { useEffect, useState } from 'react';
import { getRelayStudioList } from 'services/relayStudio';

const Relay = () => {
  const [studioAll, setStudioAll] = useState<RelayStudio[]>([]);
  const [studioParticipate, setStudioParticipate] = useState<RelayStudio[]>([]);

  useEffect(() => {
    getRelayStudioList(
      ({ data }) => {
        console.log(data);
        setStudioAll(data.all);
        setStudioParticipate(data.participate);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }, []);

  return (
    <div className="relay-page">
      <div className="relay-page__search-section">
        <SearchSection />
      </div>
      <div className="relay-page__studio-list">
        <StudioList
          studios={studioParticipate}
          title="참여중인 곡"
          isParticipating
        />
      </div>
      <div className="relay-page__line" />
      <div className="relay-page__studio-list-all">
        <StudioList
          studios={studioAll}
          title="참여 가능한 곡"
          isParticipating={false}
        />
      </div>
    </div>
  );
};

export default Relay;
