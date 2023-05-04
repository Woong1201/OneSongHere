import React from 'react';

interface StopIconProps {
  size?: number;
}

const StopIcon = ({ size = 100 }: StopIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
        fill="#4642FF"
      />
      <path d="M15.332 15.3359H35.332V35.3359H15.332V15.3359Z" fill="white" />
    </svg>
  );
};

export default StopIcon;
