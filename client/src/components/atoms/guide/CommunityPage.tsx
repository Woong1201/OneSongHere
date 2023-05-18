import './CommunityPage.scss';
import CommunityImg from 'assets/images/guide/community.png';

const AlbumPage = () => {
  return (
    <div className="community-page">
      <p className="community-page__title">커뮤니티</p>
      <img src={CommunityImg} alt="img" className="community-page__img" />
      <p className="community-page__content">
        커뮤니티는 구인, 질문, 잡담 등 다양한 카테고리로 나누어져 있습니다.
      </p>
      <p className="community-page__list">
        사용자는 각 카테고리에 맞는 글을 작성하거나 다른 사용자의 글에 응답할 수
        있습니다.
      </p>
      <hr className="community-page--hr" />
    </div>
  );
};

export default AlbumPage;
