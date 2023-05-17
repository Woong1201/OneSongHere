import React from 'react';
import 'components/atoms/common/Chip.scss';

interface ChipProps {
  /**
   * 색칠할지 안할지
   */
  primary?: boolean;
  /**
   * 배경색
   */
  backgroundColor?: string;
  /**
   * 사이즈
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 들어갈 텍스트
   */
  label: string;
}
const Chip = ({
  primary = false,
  backgroundColor = '#AFADF9',
  size = 'medium',
  label,
  ...props
}: ChipProps) => {
  const mode = primary ? 'chip--primary' : 'chip--secondary';
  return (
    <div style={{ display: 'inline-block' }}>
      <div
        className={['chip', `chip--${size}`, mode].join(' ')}
        style={{ backgroundColor }}
      >
        {label}
      </div>
      &nbsp;
    </div>
  );
};

export default Chip;
