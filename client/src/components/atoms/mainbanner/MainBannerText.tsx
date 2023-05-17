import React from 'react';
import './MainBannerText.scss';

interface MainBannerTextProps {
  content: string[];
}

const MainBannerText = ({ content }: MainBannerTextProps) => {
  return (
    <p className="main-page__banner-text">
      {content.map((line) => (
        <React.Fragment key={line}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default MainBannerText;
