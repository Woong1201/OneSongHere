import './StudioNoteNameItem.scss';

interface StudioNoteNameItemProps {
  noteName: string;
}

const StudioNoteNameItem = ({ noteName }: StudioNoteNameItemProps) => {
  return <div className={['studio__note-name-item'].join(' ')}>{noteName}</div>;
};

export default StudioNoteNameItem;
