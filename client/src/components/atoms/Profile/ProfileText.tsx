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
}

const ProfileText = ({ nickName, size = 'medium' }: ProfileTextProps) => {
  return (
    <p
      className={['profile-label__text', `profile-label__text--${size}`].join(
        ' '
      )}
    >
      {nickName}
    </p>
  );
};

export default ProfileText;
