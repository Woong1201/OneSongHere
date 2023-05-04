import React from 'react';
import './ArticleHeader.scss';
import Profile from 'components/molecules/Profilesection/Profile';

// interface ArticleHeaderProps {}
// {}: ArticleHeaderProps
const ArticleHeader = () => {
  return (
    <Profile
      imageUrl="https://images.squarespace-cdn.com/content/v1/62cd860e06ceca2438b4b307/6dfdcd3e-e6a1-479d-b393-dfa790cacd4a/Badger+Ham+Smoked+Honey+Ham"
      nickName="ham"
      size="medium"
      arrangement="horizontal"
    />
  );
};

export default ArticleHeader;
