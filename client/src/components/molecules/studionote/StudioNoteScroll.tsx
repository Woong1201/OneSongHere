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
  studioStatus: number;
  currentComposerId: number;
  currentUserId: number;
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
  studioStatus,
  currentComposerId,
  currentUserId,
}: StudioNoteScrollProps) => {
  const scrollBodyRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [bodyLeftPosition, setBodyLeftPosition] = useState(0);
  const [bodyWidthPercentage, setBodyWidthPercentage] = useState(0);

  useEffect(() => {
    setBodyWidthPercentage((containerWidth / gridWidth) * 100);
  }, [containerWidth, gridWidth]);

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
      // 클릭한 지점 - 하프바디 =  스크롤 포지션 * (parrent,offsetwidth/gridwidth)
      // 스크롤 = (x-하프바디)*grd / (prrrant.off/)
      const newScrollPosition =
        ((x - halfScrollBodyWidth) * gridWidth) / parent.offsetWidth;

      if (scrollBodyRef.current) {
        const newLeft = Math.max(
          0,
          Math.min(
            x - halfScrollBodyWidth,
            parent.offsetWidth - halfScrollBodyWidth
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
      const maxScrollLeft = parent.offsetWidth - bodyWidth;
      // 레프트는 본판 width : 스크롤 포지션은 = x : parent.offsetwidth
      // 본판 width * pa어저구 / 스크롤 포지숀
      const newLeft = Math.max(
        0,
        Math.min(
          (scrollPosition / gridWidth) * parent.offsetWidth,
          maxScrollLeft
        )
      );
      setBodyLeftPosition(newLeft);
    }
  }, [scrollPosition, scrollRef.current, scrollBodyRef.current]);

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
        studioStatus={studioStatus}
        currentComposerId={currentComposerId}
        currentUserId={currentUserId}
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
