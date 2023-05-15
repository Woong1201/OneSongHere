import React from 'react';

interface StudioChordTextProps {
  // 코드 속 개별 노트
  noteName: string;
}

const StudioChordText = ({ noteName }: StudioChordTextProps) => {
  return <span>{noteName}</span>;
};

export default StudioChordText;
