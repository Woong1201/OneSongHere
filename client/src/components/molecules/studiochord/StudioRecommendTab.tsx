import React from 'react';
import './StudioRecommendTab.scss';
import StudioRecommendTabIcon from 'components/atoms/studiochord/StudioRecommendTabIcon';

interface StudioChordTabProps {
  tabId: number;
  currentTab: number;
  changeTab: ((tab: number) => void) | undefined;
}

const StudioRecommendTab = ({
  tabId,
  currentTab,
  changeTab,
}: StudioChordTabProps) => {
  const handleClick = () => {
    if (changeTab) {
      changeTab(tabId);
    }
  };

  const isActivate = currentTab === tabId ? 'active' : 'default';
  const iconColor = currentTab === tabId ? '#453F52' : '#929292';

  return (
    <div
      role="presentation"
      className={['studio__tab', isActivate].join(' ')}
      onClick={handleClick}
    >
      <StudioRecommendTabIcon width={22} color={iconColor} />
    </div>
  );
};

export default StudioRecommendTab;
