import React from 'react';
import './StudioRecommend.scss';
import Button from 'components/atoms/buttons/Button';
import { postNotesToCreateHarmony } from 'services/relayStudio';
import { Note } from 'types/Note';

interface StudioRecommendProps {
  myNotes: Note[];
}

const StudioRecommend = ({ myNotes }: StudioRecommendProps) => {
  const stringfiedNotes = JSON.stringify(myNotes);
  console.log('요청:', stringfiedNotes);
  const onClick = () => {
    if (myNotes.length > 0) {
      postNotesToCreateHarmony(
        stringfiedNotes,
        ({ data }) => {
          console.log('응답:', data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('비어있습니다');
    }
  };
  return (
    <div className="studio__recommend">
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
