import StudioChordTabIcon from 'components/atoms/studiochord/StudioChordTabIcon';
import React from 'react';
import './StudioChordTab.scss';

interface StudioChordTabProps {
  tabId: number;
  currentTab: number;
  changeTab?: ((tab: number) => void) | undefined;
}

const StudioChordTab = ({
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
      <StudioChordTabIcon width={16} color={iconColor} />
    </div>
  );
};

export default StudioChordTab;
