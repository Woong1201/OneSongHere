import React, { useRef, useEffect, useState } from 'react';
import StudioNoteGrid from './StudioNoteGrid';
import './StudioNoteScroll.scss';

interface StudioNoteScrollProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
}

const StudioNoteScroll = ({
  scrollPosition,
  updateScrollPosition,
}: StudioNoteScrollProps) => {
  const scrollBodyRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [bodyLeftPosition, setBodyLeftPosition] = useState(0);
  const onClick = (event: React.MouseEvent) => {
    const parent = scrollRef.current;

    if (parent && scrollBodyRef.current) {
      const x = event.pageX - parent.offsetLeft;
      const maxScrollLeft = parent.offsetWidth;
      const newScrollPosition =
        (x * 4414) / (maxScrollLeft - scrollBodyRef.current.offsetWidth);

      if (scrollBodyRef.current) {
        const halfScrollBodyWidth = scrollBodyRef.current.offsetWidth / 2;
        const newLeft = Math.max(
          0,
          Math.min(
            x - halfScrollBodyWidth,
            parent.offsetWidth - scrollBodyRef.current.offsetWidth
          )
        );

        // setLocalScrollPosition(newScrollPosition);
        setBodyLeftPosition(newLeft);
        updateScrollPosition(newScrollPosition);
      }
    }
  };

  // useEffect(() => {
  //   setLocalScrollPosition(scrollPosition);
  // }, [scrollPosition]);
  useEffect(() => {
    if (scrollBodyRef.current && scrollRef.current) {
      const parent = scrollRef.current;
      const halfScrollBodyWidth = scrollBodyRef.current.offsetWidth / 2;
      const maxScrollLeft =
        parent.offsetWidth - scrollBodyRef.current.offsetWidth;
      const newLeft = Math.max(
        0,
        Math.min(
          (scrollPosition * maxScrollLeft) / 4414 - halfScrollBodyWidth,
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
      <StudioNoteGrid />
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
