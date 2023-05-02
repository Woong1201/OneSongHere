import React from 'react';
import BannerImage from 'assets/images/main_page_banner.png';
import './MainBannerImage.scss';

const MainBannerImage = () => {
  return (
    <img src={BannerImage} alt="main-banner" className="main-banner__image" />
  );
};

export default MainBannerImage;
