import React, { useRef, useState, useEffect } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(event.pageX - (scrollBodyRef.current!.offsetLeft as number));
    setScrollLeft(scrollBodyRef.current!.offsetLeft as number);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    event.preventDefault();

    const el = scrollBodyRef.current;
    const x = event.pageX - (el!.offsetParent as HTMLElement)!.offsetLeft;
    const walk = x - startX;
    el!.style.left = `${scrollLeft + walk}px`;

    const scrollBodyPositionRatio =
      (scrollLeft + walk) /
      ((el!.offsetParent as HTMLElement)!.offsetWidth - el!.offsetWidth);
    updateScrollPosition(scrollBodyPositionRatio);
  };

  useEffect(() => {
    if (scrollBodyRef.current && scrollBodyRef.current.offsetParent) {
      scrollBodyRef.current.style.left = `${
        scrollPosition *
        ((scrollBodyRef.current.offsetParent as HTMLElement).offsetWidth -
          scrollBodyRef.current.offsetWidth)
      }px`;
    }
  }, [scrollPosition]);

  return (
    <div className="studio_note__scroll">
      <StudioNoteGrid />
      <div
        role="presentation"
        className="studio_note__scroll-body"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={scrollBodyRef}
      />
    </div>
  );
};

export default StudioNoteScroll;
