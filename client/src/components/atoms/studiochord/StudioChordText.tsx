import React from 'react';
import './StudioChordText.scss';

interface StudioChordTextProps {
  // 코드 속 개별 노트
  noteNames: [string, string, string];
}

const StudioChordText = ({ noteNames }: StudioChordTextProps) => {
  return (
    <span className="studio__chord-text">
      {noteNames[0]} {noteNames[1]} {noteNames[2]}
    </span>
  );
};

export default StudioChordText;
