import StudioTemplate from 'components/templates/studio/StudioTemplate';
import './Studio.scss';

const Studio = () => {
  return (
    <div className={['studio', 'main--full-page'].join(' ')}>
      <StudioTemplate />
    </div>
  );
};

export default Studio;
