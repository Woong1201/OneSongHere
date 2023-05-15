import SectionTitle from 'components/atoms/common/SectionTitle';
import StudioChordText from 'components/atoms/studiochord/StudioChordText';
import React from 'react';
import './StudioChordCard.scss';

interface StudioChordCard {
  chordName?: string;
  noteNames?: [string, string, string];
}

const StudioChordCard = ({ chordName = '', noteNames = ['', '', ''] }) => {
  return (
    <div className="studio__chord-card">
      <SectionTitle title={chordName} />
      <StudioChordText noteNames={noteNames as [string, string, string]} />
    </div>
  );
};

export default StudioChordCard;
