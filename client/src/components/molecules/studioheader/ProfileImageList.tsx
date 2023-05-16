import React from 'react';
import './ProfileImageList.scss';
import ProfileImage from 'components/atoms/profile/ProfileImage';
import User from 'types/User';

interface ProfileImageListProps {
  /**
   * 유저 객체 리스트
   */
  users: User[];
}
const ProfileImageList = ({ users }: ProfileImageListProps) => {
  console.log(users);
  return (
    <div className="studio__header-profile">
      {users.length > 0
        ? users.map((user) => (
            <ProfileImage
              key={(user as User).userId}
              size="medium"
              arrangement="horizontal"
              imageUrl={(user as User).picture}
            />
          ))
        : null}
    </div>
  );
};

export default ProfileImageList;
