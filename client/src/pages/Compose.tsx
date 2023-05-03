import { Button } from 'components/atoms/buttons/Button';
import StudioCard from 'components/molecules/studiolist/StudioCard';
import SearchSection from 'components/organisms/searchsection/SearchSection';
import './Compose.scss';

interface Album {
  studioTitle: string;
  startDate: Date;
  endDate: Date;
  tag: string;
}
const Compose = () => {
  const date = new Date();
  const albums: Album[] = [
    { studioTitle: '몰라', startDate: date, endDate: date, tag: '재즈' },
    { studioTitle: '마라', startDate: date, endDate: date, tag: '컨트리' },
    { studioTitle: '랄라', startDate: date, endDate: date, tag: '팝' },
    { studioTitle: '링티제로', startDate: date, endDate: date, tag: '재즈' },
  ];

  return (
    <div className="compose-page">
      <div className="compose-page__search-section">
        <SearchSection />
      </div>
      <div className="compose-page__studio-list">
        <p>작업중인 곡</p>
        <Button type="button" label="생성하기" color="primary" />
        {albums ? (
          albums.map((album) => (
            <StudioCard
              key={album.studioTitle}
              studioTitle={album.studioTitle}
              startDate={album.startDate}
              endDate={album.endDate}
              tag={album.tag}
            />
          ))
        ) : (
          <p>현재 작업중인 곡이 없습니다...</p>
        )}
      </div>
    </div>
  );
};

export default Compose;
