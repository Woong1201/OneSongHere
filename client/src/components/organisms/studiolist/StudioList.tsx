import Button from 'components/atoms/buttons/Button';
import SectionTitle from 'components/atoms/common/SectionTitle';
import StudioCard from 'components/molecules/studiolist/StudioCard';
import './StudioList.scss';
import { useCallback, useState } from 'react';
import Modal from '../modal/ModalForm';

interface Studio {
  studioId: number;
  studioTitle: string;
  startDate: Date;
  endDate: Date;
  tag: string;
}

// interface StudioListProps {
//   studios?: Studio;
//   title: string;
//   isParticipating: boolean;
// }

interface StudioListProps {
  isParticipating?: boolean;
}

const StudioList = ({ isParticipating = false }: StudioListProps) => {
  const date = new Date();
  const studios: Studio[] = [
    {
      studioId: 1,
      studioTitle: '몰라',
      startDate: date,
      endDate: date,
      tag: '재즈',
    },
    {
      studioId: 2,
      studioTitle: '마라',
      startDate: date,
      endDate: date,
      tag: '컨트리',
    },
    {
      studioId: 3,
      studioTitle: '랄라',
      startDate: date,
      endDate: date,
      tag: '팝',
    },
    {
      studioId: 4,
      studioTitle: '링티제로',
      startDate: date,
      endDate: date,
      tag: '재즈',
    },
  ];

  function chunk<T>(array: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  const chunkedStudios: Studio[][] = chunk(studios, 3);

  // modal
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="studio-list">
      <div className="studio-list__title">
        <SectionTitle title="작업중인 곡" />
      </div>
      {isParticipating ? (
        <div className="studio-list__button">
          {isOpenModal && (
            <div>
              <Modal onClickModal={onClickModal} />
            </div>
          )}
          <Button
            type="button"
            label="생성하기"
            color="primary"
            onClick={onClickModal}
          />
        </div>
      ) : (
        <div className="studio-list__blank" />
      )}
      {studios ? (
        chunkedStudios.map((studioRow) => (
          <div key={studioRow[0].studioId} className="studio-list__studio-row">
            {studioRow.map((studio: Studio) => (
              <div className="studio-list__studio" key={studio.studioId}>
                <StudioCard
                  key={studio.studioId}
                  studioTitle={studio.studioTitle}
                  startDate={studio.startDate}
                  endDate={studio.endDate}
                  tag={studio.tag}
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
