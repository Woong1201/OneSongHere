import { Button } from 'components/atoms/buttons/Button';
import SectionTitle from 'components/atoms/common/SectionTitle';
import StudioCard from 'components/molecules/studiolist/StudioCard';
import './StudioList.scss';

interface Album {
  studioTitle: string;
  startDate: Date;
  endDate: Date;
  tag: string;
}

// interface StudioListProps {
//   albums?: Album;
// }

const StudioList = () => {
  const date = new Date();
  const albums: Album[] = [
    { studioTitle: '몰라', startDate: date, endDate: date, tag: '재즈' },
    { studioTitle: '마라', startDate: date, endDate: date, tag: '컨트리' },
    { studioTitle: '랄라', startDate: date, endDate: date, tag: '팝' },
    { studioTitle: '링티제로', startDate: date, endDate: date, tag: '재즈' },
  ];

  function chunk<T>(array: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  const chunkedAlbums: Album[][] = chunk(albums, 3);

  return (
    <div className="studio-list">
      <div className="studio-list__title">
        <SectionTitle title="작업중인 곡" />
      </div>
      <div className="studio-list__button">
        <Button type="button" label="생성하기" color="primary" />
      </div>
      {albums ? (
        chunkedAlbums.map((albumRow) => (
          <div
            key={albumRow[0].studioTitle}
            className="studio-list__studio-row"
          >
            {albumRow.map((album: Album) => (
              <div className="studio-list__studio">
                <StudioCard
                  key={album.studioTitle}
                  studioTitle={album.studioTitle}
                  startDate={album.startDate}
                  endDate={album.endDate}
                  tag={album.tag}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>현재 작업중인 곡이 없습니다...</p>
      )}
    </div>
  );
};

export default StudioList;
