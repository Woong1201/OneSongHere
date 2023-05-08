import React from 'react';
import './ArticleHeader.scss';
import Profile from 'components/molecules/profilesection/Profile';

// interface ArticleHeaderProps {}
// {}: ArticleHeaderProps
const ArticleHeader = () => {
  return (
    <div>
      <div>카테고리</div>
      <div>너만 오면 고</div>
      <Profile
        imageUrl="https://images.squarespace-cdn.com/content/v1/62cd860e06ceca2438b4b307/6dfdcd3e-e6a1-479d-b393-dfa790cacd4a/Badger+Ham+Smoked+Honey+Ham"
        nickName="ham"
        size="small"
        arrangement="horizontal"
      />
      <div>2023.05.04</div>
      <div>12</div>
      <div>2</div>
    </div>
  );
};

export default ArticleHeader;
