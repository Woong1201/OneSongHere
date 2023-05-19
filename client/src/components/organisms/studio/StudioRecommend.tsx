import React from 'react';
import './StudioRecommend.scss';
import Button from 'components/atoms/buttons/Button';
import { postNotesToCreateHarmony } from 'services/relayStudio';
import { Note } from 'types/Note';

interface StudioRecommendProps {
  notes: Note[];
}

const StudioRecommend = ({ notes }: StudioRecommendProps) => {
  const noteDummy: Note[] = [
    { names: ['C4'], duration: '8n', timing: 0, instrumentType: 'melody' },
    {
      names: ['D#4', 'E4'],
      duration: '8n',
      timing: 0.5,
      instrumentType: 'melody',
    },
    { names: ['C4'], duration: '8n', timing: 0.25, instrumentType: 'melody' },
    { names: ['D#4'], duration: '8n', timing: 0.75, instrumentType: 'melody' },
    { names: ['E4'], duration: '8n', timing: 1.5, instrumentType: 'melody' },
    { names: 'kick', duration: '8n', timing: 0.5, instrumentType: 'beat' },
  ];
  const stringNoteDummy = JSON.stringify(noteDummy);
  const stringfiedNotes = JSON.stringify(notes);
  console.log('요청:', stringfiedNotes);
  const onClick = () => {
    postNotesToCreateHarmony(
      stringfiedNotes,
      ({ data }) => {
        console.log('응답:', data);
      },
      (error) => {
        console.log(error);
      }
    );
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
