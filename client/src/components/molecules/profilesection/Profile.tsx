import React from 'react';
import './Profile.scss';
// import ProfileImage from 'components/atoms/profile/ProfileImage';
// import ProfileText from 'components/atoms/profile/ProfileText';

interface ProfileProps {
  /**
   * 닉네임으로 들어갈 텍스트
   */
  nickName: string;
  /**
   * 프로필 썸네일 이미지 URL
   */
  imageUrl: string;
  /**
   * 사이즈
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 배치 방향
   */
  arrangement?: 'vertical' | 'horizontal';
}

const Profile = ({
  imageUrl,
  nickName,
  size = 'medium',
  arrangement = 'vertical',
}: ProfileProps) => {
  return (
    <div
      className={[
        'profile__container',
        `profile__container--${arrangement}-${size}`,
      ].join(' ')}
    >
      <div
        className={[
          'profile__image',
          `profile__image--${arrangement}-${size}`,
        ].join(' ')}
      >
        {/* <ProfileImage
          imageUrl={imageUrl}
          size={size}
          arrangement={arrangement}
        /> */}
      </div>
      <div
        className={[
          'profile__text',
          `profile__text--${arrangement}-${size}`,
        ].join(' ')}
      >
        {/* <ProfileText
          nickName={nickName}
          size={size}
          arrangement={arrangement}
        /> */}
      </div>
    </div>
  );
};

export default Profile;
