import ComposeImg from './ComposeImg';
import './AlbumPage.scss';

const StudioPage = () => {
  return (
    <div className="album-page">
      <p className="album-page__title">작품</p>
      <div className="album-page__img">
        <ComposeImg />
      </div>
      <p className="album-page__content">
        작품 페이지에서는 다양한 앨범들을 확인할 수 있습니다.
      </p>
      <p className="album-page__list">
        앨범 커버에 마우스를 올리면 재생 버튼이 나타나며, 이를 클릭하여 곡을
        재생할 수 있습니다.
      </p>
      <p className="album-page__list">
        사용자는 자신이 좋아하는 앨범에 &apos;좋아요&apos;를 표시할 수 있습니다.
        가장 많은 &apos;좋아요&apos;를 받은 상위 3개 앨범은 &apos;명예의
        전당&apos;에 등록되어 다른 사용자들에게 추천됩니다.
      </p>
      <hr className="album-page--hr" />
    </div>
  );
};

export default StudioPage;
