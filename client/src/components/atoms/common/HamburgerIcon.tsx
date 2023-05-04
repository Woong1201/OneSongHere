import React from 'react';
import Size from 'types/Size';

interface HamburgerIconProps {
  // 너비, 너비에 따라 높이는 비례해서 설정
  size?: 'small' | 'medium' | 'large';
  // 색깔
  color?: string;
}

const HamburgerIcon = ({
  size = 'medium',
  color = 'black',
}: HamburgerIconProps) => {
  const width = () => {
    switch (size) {
      case Size.Small:
        return 50;
      case Size.Medium:
        return 100;
      case Size.Large:
        return 150;
      default:
        return 100;
    }
  };

  const svgWidth = width();
  const svgHeight = svgWidth;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 93H106V77.5H0V93ZM0 54.25H106V38.75H0V54.25ZM0 0V15.5H106V0H0Z"
        fill={color}
      />
    </svg>
  );
};

export default HamburgerIcon;
