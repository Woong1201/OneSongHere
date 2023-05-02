import React from 'react';
import './MainBanner.scss';
import MainBannerImage from 'components/atoms/mainbanner/MainBannerImage';
import MainBannerContent from 'components/molecules/mainbody/MainBannerContent';

interface MainBannerProps {
  content: string[];
}

const MainBanner = ({ content }: MainBannerProps) => {
  return (
    <div className="main-page__banner">
      <MainBannerImage />
      <MainBannerContent content={content} />
    </div>
  );
};

export default MainBanner;
