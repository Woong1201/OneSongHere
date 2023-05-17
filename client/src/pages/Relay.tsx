import SearchSection from 'components/organisms/searchsection/SearchSection';
import StudioList from 'components/organisms/studiolist/StudioList';
import './Relay.scss';
import { RelayStudio } from 'types/RelayStudio';
import { useEffect, useState } from 'react';
import {
  getRelayStudioList,
  getStudioSearchResult,
} from 'services/relayStudio';
import StudioListBanner from 'components/molecules/studiolist/StudioListBanner';

const Relay = () => {
  const [studioAll, setStudioAll] = useState<RelayStudio[]>([]);
  const [studioParticipate, setStudioParticipate] = useState<RelayStudio[]>([]);

  const [searchType, setSearchType] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const handleSearchType = (type: string) => {
    setSearchType(type);
  };
  const handleKeyword = (word: string) => {
    setKeyword(word);
  };

  useEffect(() => {
    if (keyword === '') {
      getRelayStudioList(
        ({ data }) => {
          setStudioAll(data.all);
          setStudioParticipate(data.participate);
        },
        (error) => {
          console.log('릴레이 스튜디오 리스트 가져오기 에러', error);
        }
      );
    } else {
      getStudioSearchResult(
        searchType,
        keyword,
        ({ data }) => {
          setStudioAll(data.all);
          setStudioParticipate(data.participate);
        },
        (error) => {
          console.log('스튜디오 검색 에러:', error);
        }
      );
    }
  }, [searchType, keyword]);

  return (
    <div className="relay-page">
      <div className="relay__banner-container">
        <StudioListBanner />
      </div>
      <div className="relay-page__search-section">
        <SearchSection
          onChangeSearchType={handleSearchType}
          onChangeKeyword={handleKeyword}
        />
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
