import './StudioPage.scss';
import StudioImg from 'assets/images/guide/studio.png';
import MenuImg from 'assets/images/guide/menu.png';
import CompleteImg from 'assets/images/guide/complete.png';

const StudioPage = () => {
  return (
    <div className="studio-page">
      <p className="studio-page__title">스튜디오</p>
      <div className="studio-page__img">
        <img src={StudioImg} alt="img" className="studio-page__img--studio" />
      </div>
      <p className="studio-page__content">
        스튜디오 페이지에서는 아래와 같은 경험들을 할 수 있습니다.
      </p>
      <p className="studio-page__content">
        1. 피아노와 드럼의 소리를 조합하여 곡을 작곡할 수 있으며 클릭이나 키보드
        입력으로 노트를 입력할 수 있습니다. 편집할 수 있는 부분은 밝은 색으로
        표시됩니다.
      </p>
      <p className="studio-page__content">
        2.코드 버튼을 통해 다양한 코드를 사용할 수 있어 작곡에 익숙치 않은
        사용자도 쉽게 작곡에 참여할 수 있습니다. 자신이 편집한 부분을 들어볼 수
        있습니다.
      </p>
      <p className="studio-page__content">
        3. 참여자들이 투표하여 작업물이 곡에 포함될지를 결정합니다.
      </p>
      <p className="studio-page__content">
        4. 지금까지의 작업물과 자신이 편집한 부분을 들어볼 수 있습니다.
      </p>
      <div className="studio-page__img">
        <img src={MenuImg} alt="img" className="studio-page__img--menu" />
      </div>
      <p className="studio-page__list">
        &apos;임시저장&apos; 기능을 통해 현재까지의 작업을 임시로 저장할 수
        있습니다.
      </p>
      <p className="studio-page__list">
        &apos;제출하기&apos;를 통해 자신의 작업물을 제출하면, 투표가 진행됩니다.
      </p>
      <p className="studio-page__list">
        &apos;완성하기&apos; 버튼을 클릭한 후 앨범의 제목, 내용, 장르를 입력하면
        세상에 하나뿐인 나만의 앨범이 완성됩니다.
      </p>
      <div className="studio-page__img">
        <img
          src={CompleteImg}
          alt="img"
          className="studio-page__img--content"
        />
      </div>
      <hr className="studio-page--hr" />
    </div>
  );
};

export default StudioPage;
