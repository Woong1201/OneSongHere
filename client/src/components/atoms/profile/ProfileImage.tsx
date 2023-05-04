import React from 'react';
import './ProfileImage.scss';

interface ProfileImageProps {
  /**
   * 이미지 URL을 넣어주세요
   */
  imageUrl?: string;
  /**
   * 이미지 크기
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 배치 방향
   */
  arrangement?: 'vertical' | 'horizontal';
}

const ProfileImage = ({
  imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
  size = 'medium',
  arrangement = 'vertical',
}: ProfileImageProps) => {
  return (
    <div
      className={[
        'profile-image__container',
        `profile-image__container--${arrangement}-${size}`,
      ].join(' ')}
    >
      <img src={imageUrl} alt="" className="profile-image__img" />
    </div>
  );
};

export default ProfileImage;
