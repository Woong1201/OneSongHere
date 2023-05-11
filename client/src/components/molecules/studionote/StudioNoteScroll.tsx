import React, { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';
import Note from 'types/Note';
import StudioNoteGrid from './StudioNoteGrid';
import './StudioNoteScroll.scss';

interface StudioNoteScrollProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  pianoInstance: Tone.Sampler | null;
  notes: Note[];
}

const StudioNoteScroll = ({
  scrollPosition,
  updateScrollPosition,
  pianoInstance,
  notes,
}: StudioNoteScrollProps) => {
  const scrollBodyRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [bodyLeftPosition, setBodyLeftPosition] = useState(0);
  const onClick = (event: React.MouseEvent) => {
    const parent = scrollRef.current;

    if (parent && scrollBodyRef.current) {
      // 클릭한 지점
      const x = event.pageX - parent.offsetLeft;
      // Left의 최대값
      const maxScrollLeft = parent.offsetWidth;
      const halfScrollBodyWidth = scrollBodyRef.current.offsetWidth / 2;
      // 새로운 스크롤 포지션
      // 클릭한 지점에서 하프 포지션을 뺀것에서 스크롤바디 너비에서 바디 뺀 비율
      const newScrollPosition =
        ((x - halfScrollBodyWidth) * 4414) /
        (maxScrollLeft - scrollBodyRef.current.offsetWidth);

      if (scrollBodyRef.current) {
        const newLeft = Math.max(
          0,
          Math.min(
            x - halfScrollBodyWidth,
            parent.offsetWidth - scrollBodyRef.current.offsetWidth
          )
        );

        setBodyLeftPosition(newLeft);
        updateScrollPosition(newScrollPosition);
      }
    }
  };

  useEffect(() => {
    if (scrollBodyRef.current && scrollRef.current) {
      const parent = scrollRef.current;
      const bodyWidth = scrollBodyRef.current.offsetWidth;
      const halfScrollBodyWidth = bodyWidth / 2;
      const maxScrollLeft = parent.offsetWidth - bodyWidth;
      const newLeft = Math.max(
        0,
        Math.min(
          (scrollPosition / 4414) * (parent.offsetWidth - bodyWidth),
          maxScrollLeft
        )
      );
      setBodyLeftPosition(newLeft);
    }
  }, [scrollPosition]);

  return (
    <div
      role="presentation"
      className="studio_note__scroll"
      ref={scrollRef}
      onClick={onClick}
    >
      <StudioNoteGrid notes={notes} pianoInstance={pianoInstance} />
      <div
        role="presentation"
        className="studio_note__scroll-body"
        ref={scrollBodyRef}
        style={{ left: `${bodyLeftPosition}px` }}
      />
    </div>
  );
};

export default StudioNoteScroll;
