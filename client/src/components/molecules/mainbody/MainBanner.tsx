import React from 'react';
import './MainBanner.scss';
import MainBannerImage from 'components/atoms/mainbanner/MainBannerImage';
import MainBannerText from 'components/atoms/mainbanner/MainBannerText';

interface MainBannerProps {
  content: string[];
}

const MainBanner = ({ content }: MainBannerProps) => {
  return (
    <div className="main-page__banner">
      <MainBannerImage />
      <MainBannerText content={content} />
    </div>
  );
};

export default MainBanner;
