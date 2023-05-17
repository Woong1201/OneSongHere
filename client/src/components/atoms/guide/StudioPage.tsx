import StudioCompleteImg from './StudioCompleteImg';
import './StudioPage.scss';

const StudioPage = () => {
  return (
    <div className="studio-page">
      <p className="studio-page__title">스튜디오</p>
      <div className="studio-page__img">스튜디오 페이지</div>
      <p className="studio-page__content">
        스튜디오 페이지에서는 피아노와 드럼의 소리를 조합하여 곡을 작곡할 수
        있으며, 편집할 수 있는 부분은 밝은 색으로 표시됩니다.
      </p>
      <p className="studio-page__list">
        &apos;임시저장&apos; 기능을 통해 현재까지의 작업을 임시로 저장할 수
        있습니다.
      </p>
      <p className="studio-page__list">
        &apos;제출하기&apos;를 통해 자신의 작업물을 제출하면, 이전 참여자들이
        투표하여 곡에 포함될지를 결정합니다.
      </p>
      <div className="studio-page__img">
        <StudioCompleteImg />
      </div>
      <p className="studio-page__list">
        &apos;완성하기&apos; 버튼을 클릭하여 곡을 완성하고 앨범으로 등록할 수
        있습니다.
      </p>
      <hr className="studio-page--hr" />
    </div>
  );
};

export default StudioPage;
