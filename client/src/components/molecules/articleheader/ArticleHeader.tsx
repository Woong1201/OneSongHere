import React from 'react';
import './ArticleHeader.scss';
import Profile from 'components/molecules/profilesection/Profile';

interface ArticleHeaderProps {
  header: string;
  title: string;
  picture: string;
  nickname: string;
  date: string;
}
const ArticleHeader = ({
  header,
  title,
  picture,
  nickname,
  date,
}: ArticleHeaderProps) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);

  return (
    <div>
      <div>
        [{header}]&nbsp;&nbsp;{title}
      </div>
      <div className="header__profile-img">
        <Profile
          imageUrl={picture}
          nickName={nickname}
          size="small"
          arrangement="horizontal"
        />
      </div>
      <div>
        {String(newDate.getUTCFullYear())}.
        {`0${String(newDate.getMonth() + 1)}`.slice(-2)}.
        {`0${String(newDate.getDate())}`.slice(-2)}
        &nbsp;&nbsp;
        {`0${String(newDate.getHours())}`.slice(-2)}:
        {`0${String(newDate.getMinutes())}`.slice(-2)}
      </div>
    </div>
  );
};

export default ArticleHeader;
