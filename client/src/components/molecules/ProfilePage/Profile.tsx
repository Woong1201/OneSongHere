import React from 'react';
import './Profile.scss';
import ProfileImage from 'components/atoms/Profile/ProfileImage';
import ProfileText from 'components/atoms/Profile/ProfileText';

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
}

const Profile = ({ imageUrl, nickName, size }: ProfileProps) => {
  return (
    <div
      className={['profile__container', `profile__container--${size}`].join(
        ' '
      )}
    >
      <div className={['profile__image', `profile__image--${size}`].join(' ')}>
        <ProfileImage imageUrl={imageUrl} size={size} />
      </div>
      <div className="profile__text">
        <ProfileText nickName={nickName} size={size} />
      </div>
    </div>
  );
};

export default Profile;
