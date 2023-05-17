import React from 'react';
import './AlbumPlayButton.scss';

interface AlbumPlayButtonProps {
  onClick?: () => void;
}

const AlbumPlayButton = ({ onClick }: AlbumPlayButtonProps) => {
  return (
    <div role="presentation" className="album__play-button" onClick={onClick}>
      <svg
        width="77"
        height="77"
        viewBox="0 0 77 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="38.5" cy="38.5" r="36" stroke="#453F52" strokeWidth="5" />
        <path
          d="M59.7588 38.8433L26.1131 58.2686L26.1131 19.418L59.7588 38.8433Z"
          fill="#453F52"
        />
      </svg>
    </div>
  );
};

export default AlbumPlayButton;
