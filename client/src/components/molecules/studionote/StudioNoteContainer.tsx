import React, { useState, useEffect, useRef } from 'react';
import './StudioNoteContainer.scss';
import StudioNoteGrid from './StudioNoteGrid';

interface StudioNoteScrollProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
}

const StudioNoteContainer = ({
  scrollPosition,
  updateScrollPosition,
}: StudioNoteScrollProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(scrollPosition);
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const el = ref.current;
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
    if (!isDragging || !ref.current) return;

    event.preventDefault();
    const x = event.pageX - ref.current.offsetLeft;
    const move = x - startX;

    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.scrollLeft = scrollLeft - move;
      }
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const el = ref.current;
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

  useEffect(() => {
    updateScrollPosition(scrollLeft);
  }, [scrollLeft]);

  return (
    <div
      role="presentation"
      className="studio__note-container"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      <StudioNoteGrid />
    </div>
  );
};

export default StudioNoteContainer;
