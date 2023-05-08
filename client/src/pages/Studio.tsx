import StudioHeader from 'components/organisms/studio/StudioHeader';
import './Studio.scss';

const Studio = () => {
  return (
    <div className={['studio', 'main--full-page'].join(' ')}>
      <StudioHeader />
    </div>
  );
};

export default Studio;
