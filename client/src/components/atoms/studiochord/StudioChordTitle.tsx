import React from 'react';
import './StudioChordTitle.scss';

interface StudioChordTitleProps {
  // 코드 속 개별 노트
  chord: string;
}

const StudioChordTitle = ({ chord }: StudioChordTitleProps) => {
  return <span className="studio__chord-title">{chord}</span>;
};

export default StudioChordTitle;
