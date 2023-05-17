import StudioChordText from 'components/atoms/studiochord/StudioChordText';
import React from 'react';
import './StudioChordCard.scss';
import StudioChordTitle from 'components/atoms/studiochord/StudioChordTitle';
import { Chord } from 'types/Chord';

interface StudioChordCardProps {
  chordName?: string;
  noteNames?: [string, string, string];
  onClick?: (chord: Chord) => void;
}

const StudioChordCard: React.FC<StudioChordCardProps> = ({
  chordName = '',
  noteNames = ['', '', ''],
  onClick,
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick(chordName as Chord); // 캐스팅: string -> Chord
    }
  };

  return (
    <div
      role="presentation"
      className="studio__chord-card"
      onClick={handleOnClick}
    >
      <div className="studio__chord-card-content">
        <div className="studio__chord-card-title-area">
          <StudioChordTitle chord={chordName} />
        </div>
        <StudioChordText noteNames={noteNames as [string, string, string]} />
      </div>
    </div>
  );
};

export default StudioChordCard;
