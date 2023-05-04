import React from 'react';
import './MainBannerContent.scss';
import MainBannerText from 'components/atoms/mainbanner/MainBannerText';
import Button from 'components/atoms/buttons/Button';

interface MainBannerContentProps {
  content: string[];
}

const MainBannerContent = ({ content }: MainBannerContentProps) => {
  return (
    <div className="main-page__banner-content">
      <MainBannerText content={content} />
      <Button type="button" label="작곡하기" color="main" />
    </div>
  );
};

export default MainBannerContent;
