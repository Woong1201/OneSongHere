import React from 'react';

interface PlayIconProps {
  size?: number;
}

const PlayIcon = ({ size = 100 }: PlayIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 25.0391C50 38.8462 38.8071 50.0391 25 50.0391C11.1929 50.0391 0 38.8462 0 25.0391C0 11.2319 11.1929 0.0390625 25 0.0390625C38.8071 0.0390625 50 11.2319 50 25.0391Z"
        fill="#4642FF"
      />
      <path
        d="M17.333 36.7057V14.0391L35.333 25.2032L17.333 36.7057Z"
        fill="white"
      />
    </svg>
  );
};

export default PlayIcon;
