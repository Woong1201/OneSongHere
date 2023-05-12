import Button from 'components/atoms/buttons/Button';
import SectionTitle from 'components/atoms/common/SectionTitle';
import StudioCard from 'components/molecules/studiolist/StudioCard';
import './StudioList.scss';
import { useCallback, useState } from 'react';
import RelayStudio from 'types/RelayStudio';
import Modal from '../modal/ModalForm';

interface StudioListProps {
  studios: RelayStudio[];
  isParticipating?: boolean;
  title: string;
}

const StudioList = ({
  studios,
  isParticipating = false,
  title,
}: StudioListProps) => {
  function chunk<T>(array: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  const chunkedStudios: RelayStudio[][] = chunk(studios, 3);

  // modal
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const endDateStringtoDate = (date: string) => {
    return new Date(date);
  };

  const getStartDate = (date: string) => {
    const endDate = new Date(date);
    return new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  };

  return (
    <div className="studio-list">
      <div className="studio-list__title">
        <SectionTitle title={title} />
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
      <div className="studio-list__container">
        {studios.length > 0 ? (
          chunkedStudios.map((studioRow) => (
            <div
              key={studioRow[0].relayStudioID}
              className="studio-list__studio-row"
            >
              {studioRow.map((studio: RelayStudio) => (
                <div className="studio-list__studio" key={studio.relayStudioID}>
                  <StudioCard
                    key={studio.relayStudioID}
                    studioTitle={studio.relayStudioTitle}
                    startDate={getStartDate(studio.endDate)}
                    endDate={endDateStringtoDate(studio.endDate)}
                    tags={studio.tags}
                  />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="studio-list__empty">현재 작업중인 곡이 없습니다...</p>
        )}
      </div>
    </div>
  );
};

export default StudioList;
