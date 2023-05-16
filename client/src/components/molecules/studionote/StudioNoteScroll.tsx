import React, { useRef, useEffect, useState } from 'react';
import { Note } from 'types/Note';
import StudioNoteGrid from './StudioNoteGrid';
import './StudioNoteScroll.scss';

interface StudioNoteScrollProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  notes: Note[];
  noteColumnStyle: boolean[];
  columnNum: number;
  containerWidth: number;
  gridWidth: number;
  userOrder: number;
  barNum: number;
}

const StudioNoteScroll = ({
  scrollPosition,
  updateScrollPosition,
  notes,
  noteColumnStyle,
  columnNum,
  containerWidth,
  gridWidth,
  userOrder,
  barNum,
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
        ((x - halfScrollBodyWidth) * gridWidth) /
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
          (scrollPosition / gridWidth) * (parent.offsetWidth - bodyWidth),
          maxScrollLeft
        )
      );
      setBodyLeftPosition(newLeft);
    }
  }, [scrollPosition]);
  const bodyWidthPercentage = (containerWidth / gridWidth) * 100;

  return (
    <div
      role="presentation"
      className="studio_note__scroll"
      ref={scrollRef}
      onClick={onClick}
    >
      <StudioNoteGrid
        noteColumnStyle={noteColumnStyle}
        notes={notes}
        columnNum={columnNum}
        userOrder={userOrder}
        barNum={barNum}
      />
      <div
        role="presentation"
        className="studio_note__scroll-body"
        ref={scrollBodyRef}
        style={{
          left: `${bodyLeftPosition}px`,
          width: `${bodyWidthPercentage}%`,
        }}
      />
    </div>
  );
};

export default StudioNoteScroll;
