import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useEffect, useState } from 'react';
import './StudioNote.scss';
import { Note } from 'types/Note';

interface StudioNoteProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  notes: Note[];
  updateNote: (name: string, timing: number) => void;
  updateDrum: (name: string, timing: number | undefined) => void;
  playNote: (noteName: string | string[]) => void;
  playDrum: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  noteColumnStyle: boolean[];
  columnNum: number;
  containerWidth: number;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
}
const StudioNote = ({
  scrollPosition,
  updateScrollPosition,
  updateNote,
  updateDrum,
  playNote,
  playDrum,
  notes,
  noteColumnStyle,
  columnNum,
  containerWidth,
  setContainerWidth,
}: StudioNoteProps) => {
  const [gridWidth, setGridWidth] = useState(0);
  useEffect(() => {
    setGridWidth(columnNum * 35 - containerWidth);
  }, [containerWidth, columnNum]);
  console.log('columnNum', columnNum);
  console.log('gridWidth', gridWidth);
  console.log('containerWidth', containerWidth);

  return (
    <div className="studio__note">
      <StudioNoteScroll
        notes={notes}
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        noteColumnStyle={noteColumnStyle}
        columnNum={columnNum}
        containerWidth={containerWidth}
        gridWidth={gridWidth}
      />
      <div className="studio__content">
        <div className="studio__note_name">스크롤</div>
        <StudioNoteContainer
          notes={notes}
          scrollPosition={scrollPosition}
          updateScrollPosition={updateScrollPosition}
          updateNote={updateNote}
          updateDrum={updateDrum}
          playNote={playNote}
          playDrum={playDrum}
          noteColumnStyle={noteColumnStyle}
          columnNum={columnNum}
          containerWidth={containerWidth}
          setContainerWidth={setContainerWidth}
          gridWidth={gridWidth}
        />
      </div>
    </div>
  );
};

export default StudioNote;
