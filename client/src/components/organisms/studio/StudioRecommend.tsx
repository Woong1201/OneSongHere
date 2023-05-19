import React from 'react';
import './StudioRecommend.scss';
import Button from 'components/atoms/buttons/Button';
import { postNotesToCreateHarmony } from 'services/relayStudio';
import { Note } from 'types/Note';
import StudioRecommendedNoteCard from 'components/molecules/studiochord/StudioRecommendedNoteCard';

interface StudioRecommendProps {
  myNotes: Note[];
  recommendedNotes: Note[];
  setRecommendedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const StudioRecommend = ({
  myNotes,
  recommendedNotes,
  setRecommendedNotes,
}: StudioRecommendProps) => {
  const stringfiedNotes = JSON.stringify(myNotes);
  console.log('요청:', stringfiedNotes);
  const onClick = () => {
    if (myNotes.length > 0) {
      postNotesToCreateHarmony(
        stringfiedNotes,
        ({ data }) => {
          console.log('응답:', data);
          const parsingData = JSON.parse(data);
          setRecommendedNotes(parsingData);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('입력한 노트가 없습니다.');
    }
  };
  return (
    <div className="studio__recommend">
      {/* <p className="studio__recommend-result-list">추천하는 코드</p> */}
      {/* {recommendedNotes.length > 0 &&
        recommendedNotes.map((note: Note) => {
          return <StudioRecommendedNoteCard note={note} />;
        })} */}
      <Button
        label="추천받기"
        type="button"
        color="primary"
        onClick={onClick}
      />
    </div>
  );
};

export default StudioRecommend;
