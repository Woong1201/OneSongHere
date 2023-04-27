import React from 'react';
import './ProfileImage.scss';

interface ProfileImageProps {
  /**
   * 이미지 URL을 넣어주세요
   */
  imageUrl: string;
  /**
   * 이미지 크기
   */
  size?: 'small' | 'medium' | 'large';
}

const ProfileImage = ({ imageUrl, size = 'medium' }: ProfileImageProps) => {
  return (
    <div
      className={[
        'profile-image__container',
        `profile-image__container--${size}`,
      ].join(' ')}
    >
      <img src={imageUrl} alt="" className="profile-image__img" />
    </div>
  );
};

export default ProfileImage;
