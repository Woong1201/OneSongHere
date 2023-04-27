import React from 'react';
import './ProfileText.scss';

interface ProfileTextProps {
  /**
   * 텍스트 내용
   */
  nickName: string;
  /**
   * 크기
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 배치 방향
   */
  arrangement?: 'vertical' | 'horizontal';
}

const ProfileText = ({
  nickName,
  size = 'medium',
  arrangement = 'vertical',
}: ProfileTextProps) => {
  return (
    <span
      className={[
        'profile-label__text',
        `profile-label__text--${arrangement}-${size}`,
      ].join(' ')}
    >
      {nickName}
    </span>
  );
};

export default ProfileText;
