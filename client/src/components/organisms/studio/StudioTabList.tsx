import StudioChordTab from 'components/molecules/studiochord/StudioChordTab';
import React from 'react';
import './StudioTabList.scss';
import StudioRecommendTab from 'components/molecules/studiochord/StudioRecommendTab';

interface StudioTabListProps {
  currentTab: number;
  changeTab?: (tab: number) => void;
}

const StudioTabList = ({ currentTab = 1, changeTab }: StudioTabListProps) => {
  return (
    <div className="studio__tab-list">
      <StudioChordTab tabId={1} currentTab={currentTab} changeTab={changeTab} />
      <StudioRecommendTab
        tabId={2}
        currentTab={currentTab}
        changeTab={changeTab}
      />
    </div>
  );
};

export default StudioTabList;
