import RelayStudioTemplate from 'components/templates/relaystudio/RelayStudioTemplate';
import React from 'react';

const RelayStudio = () => {
  return (
    <div className={['studio', 'main--full-page'].join(' ')}>
      <RelayStudioTemplate />
    </div>
  );
};

export default RelayStudio;
