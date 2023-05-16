import React, { useState, useEffect, useRef } from 'react';
import './StudioNoteContainer.scss';
import { Note } from 'types/Note';
import StudioNoteGrid from './StudioNoteGrid';

interface StudioNoteScrollProps {
  notes: Note[];
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  updateNote: (name: string, timing: number) => void;
  updateDrum: (name: string, timing: number | undefined) => void;
  playNote: (noteName: string | string[]) => void;
  playDrum: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  noteColumnStyle: boolean[];
  columnNum: number;
  containerWidth: number;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  gridWidth: number;
  userOrder: number;
}

const StudioNoteContainer = ({
  notes,
  scrollPosition,
  updateScrollPosition,
  updateNote,
  updateDrum,
  playNote,
  playDrum,
  noteColumnStyle,
  columnNum,
  containerWidth,
  setContainerWidth,
  gridWidth,
  userOrder,
}: StudioNoteScrollProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(scrollPosition);
  const containerRef = useRef<HTMLDivElement | null>(null);
  console.log(1, containerRef.current?.offsetWidth);
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const onMouseDown = (event: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    setIsDragging(true);
    setStartX(event.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const move = x - startX;

    requestAnimationFrame(() => {
      if (containerRef.current) {
        const newScrollLeft = Math.max(
          0,
          Math.min(gridWidth, scrollLeft - move)
        );
        containerRef.current.scrollLeft = newScrollLeft;
        updateScrollPosition(newScrollLeft);
      }
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const el = containerRef.current;
    if (!el) return;

    switch (event.key) {
      case 'ArrowRight':
        el.scrollLeft += 50;
        updateScrollPosition(el.scrollLeft);
        break;
      case 'ArrowLeft':
        el.scrollLeft -= 50;
        updateScrollPosition(el.scrollLeft);
        break;
      default:
        break;
    }
  };
  const onWheel = (event: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const newScrollLeft = el.scrollLeft + event.deltaX;

    const limitedScrollLeft = Math.max(0, Math.min(gridWidth, newScrollLeft));

    el.scrollLeft = limitedScrollLeft;
    updateScrollPosition(limitedScrollLeft);
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div
      role="presentation"
      className="studio__note-container"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      ref={containerRef}
    >
      <StudioNoteGrid
        notes={notes}
        updateNote={updateNote}
        updateDrum={updateDrum}
        playNote={playNote}
        playDrum={playDrum}
        noteColumnStyle={noteColumnStyle}
        columnNum={columnNum}
        userOrder={userOrder}
      />
    </div>
  );
};

export default StudioNoteContainer;
