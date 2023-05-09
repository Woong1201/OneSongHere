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

    if (parent) {
      const x = event.pageX - parent.offsetLeft;
      const maxScrollLeft = parent.offsetWidth;
      const newScrollPosition = (x * 4414) / maxScrollLeft;

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
      const maxScrollLeft = parent.offsetWidth;
      const halfScrollBodyWidth = scrollBodyRef.current.offsetWidth / 2;
      const newLeft =
        ((scrollPosition > halfScrollBodyWidth
          ? scrollPosition
          : halfScrollBodyWidth) /
          4414) *
          maxScrollLeft -
        halfScrollBodyWidth;
      // setLocalScrollPosition(scrollPosition);
      setBodyLeftPosition(
        Math.max(
          0,
          Math.min(
            newLeft,
            parent.offsetWidth - scrollBodyRef.current.offsetWidth
          )
        )
      );
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
