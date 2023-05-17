import React, { useState } from 'react';
import './StudioNoteName.scss';
import StudioNoteNameItem from 'components/atoms/studionote/StudioNoteNameItem';

const StudioNoteName = () => {
  const noteListKor = [
    '시',
    '라#',
    '라',
    '솔#',
    '솔',
    '파#',
    '파',
    '미',
    '레#',
    '레',
    '도#',
    '도',
    '시',
    '라#',
    '라',
    '솔#',
    '솔',
    '파#',
    '파',
    '미',
    '레#',
    '레',
    '도#',
    '도',
    'snare',
    'kick',
  ];
  const noteListEng = [
    'B5',
    'A#5',
    'A5',
    'G#5',
    'G5',
    'F#5',
    'F5',
    'E5',
    'D#5',
    'D5',
    'C#5',
    'C5',
    'B4',
    'A#4',
    'A4',
    'G#4',
    'G4',
    'F#4',
    'F4',
    'E4',
    'D#4',
    'D4',
    'C#4',
    'C4',
    'snare',
    'kick',
  ];

  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const noteList = isEnglish ? noteListEng : noteListKor;

  return (
    <div
      role="presentation"
      className="studio__note_name"
      onClick={toggleLanguage}
      key={`${isEnglish}`}
    >
      {noteList.map((note) => {
        return <StudioNoteNameItem key={note} noteName={note} />;
      })}
    </div>
  );
};

export default StudioNoteName;
