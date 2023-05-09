import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';

const StudioNote = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position);
  };

  return (
    <div className="studio__note">
      <StudioNoteScroll
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
      />
      {scrollPosition}
      <StudioNoteContainer
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
      />
    </div>
  );
};

export default StudioNote;
