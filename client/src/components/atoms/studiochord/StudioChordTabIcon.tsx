import React from 'react';

interface StudioChordTabIconProps {
  width?: number;
  color?: string;
}

const StudioChordTabIcon = ({
  width = 50,
  color = 'black',
}: StudioChordTabIconProps) => {
  const svgHeight = width * (331 / 475);
  return (
    <svg
      width={width}
      height={svgHeight}
      viewBox="0 0 331 475"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="37" width="38" height="475" fill="black" />
      <rect x="147" width="38" height="475" fill="black" />
      <rect x="257" width="38" height="475" fill="black" />
      <circle cx="55.5" cy="105.5" r="55.5" fill="black" />
      <circle cx="165.5" cy="237.5" r="55.5" fill="black" />
      <circle cx="275.5" cy="377.5" r="55.5" fill="black" />
    </svg>
  );
};

export default StudioChordTabIcon;
