import React from 'react';
import './StudioRecommendedNoteCard.scss';
import { Note } from 'types/Note';

interface StudioRecommendedNoteCardProps {
  note: Note;
}
const StudioRecommendedNoteCard = ({
  note,
}: StudioRecommendedNoteCardProps) => {
  return (
    <div className="studio__recommended-note-card">{(note as Note).names}</div>
  );
};

export default StudioRecommendedNoteCard;
