import React from 'react';
import './ArticleHeader.scss';
import Profile from 'components/molecules/profilesection/Profile';

interface ArticleHeaderProps {
  header: string;
  title: string;
  nickname: string;
  date: string;
}
const ArticleHeader = ({
  header,
  title,
  nickname,
  date,
}: ArticleHeaderProps) => {
  return (
    <div>
      <div>
        [{header}]&nbsp;&nbsp;{title}
      </div>
      <div className="header__profile-img">
        <Profile
          imageUrl="https://images.squarespace-cdn.com/content/v1/62cd860e06ceca2438b4b307/6dfdcd3e-e6a1-479d-b393-dfa790cacd4a/Badger+Ham+Smoked+Honey+Ham"
          nickName={nickname}
          size="small"
          arrangement="horizontal"
        />
      </div>
      <div>{date}</div>
    </div>
  );
};

export default ArticleHeader;
