import './Intro.scss';

const Docs = () => {
  return (
    <div className="intro">
      <p className="intro__title">서비스 소개</p>
      <p className="intro__content">
        OneSongHere는 창작의 즐거움을 더하는 릴레이 작곡 웹 서비스입니다!
        이곳에서는 음악을 사랑하는 사람들이 모여 서로의 아이디어를 이어받아
        하나의 곡을 완성하는 놀라운 경험을 할 수 있습니다.
      </p>
      <hr className="intro--hr" />
      <p className="intro__subtitle">릴레이 작곡? 그게 무엇인가요</p>
      <p className="intro__content">
        릴레이 작곡은 여러 참여자들이 순차적으로 자신의 음악적 아이디어를
        추가해가며 하나의 곡을 완성하는 방식입니다. 각 참여자는 한 명당 설정된
        길이만큼의 음악을 작곡하고, 다음 참여자는 그것을 이어받아 추가로
        작곡합니다. 마치 릴레이처럼 참여자 간에 음악이 이어진다고 할 수
        있습니다.
      </p>
      <hr className="intro--hr" />
      <p className="intro__subtitle">어떻게 사용하나요?</p>
      <p className="intro__content">
        • 작곡 페이지: 참여중인 프로젝트와 참여할 수 있는 다양한 프로젝트를
        보여줍니다. 원하는 프로젝트가 없다면, &apos;생성하기&apos;를 통해
        자신만의 새로운 작곡 스튜디오를 만들 수 있습니다.
      </p>
      <p className="intro__content">
        • 스튜디오 페이지: 피아노와 드럼의 소리를 활용하여 창작에 임할 수
        있습니다. 입력 방식은 클릭 또는 키보드 입력을 통해 가능하며,
        &apos;임시저장&apos;, &apos;제출하기&apos;, &apos;완성하기&apos; 기능을
        통해 작곡 과정을 관리할 수 있습니다.
      </p>
      <p className="intro__content">
        • 커뮤니티: 구인, 질문, 홍보, 잡담 등 다양한 카테고리로 나누어져 있어,
        사용자들끼리 소통하고 정보를 공유할 수 있습니다.
      </p>
      <p className="intro__content">
        • 작품 페이지: 완성된 앨범들을 확인하고, 앨범을 재생하거나 좋아요를 누를
        수 있습니다. 가장 인기있는 앨범은 &apos;명예의 전당&apos;에 등록됩니다.
      </p>
      <hr className="intro--hr" />
      <p className="intro__subtitle">
        다양한 사람들과 함께 창작하고 공유하는 즐거움을 느껴보세요!
      </p>
      <p className="intro__content">
        이제 릴레이 작곡 웹 서비스를 통해 다양한 사람들과 함께 창작하고, 그
        즐거움을 나눠보세요. 여러분의 아이디어가 하나의 멋진 음악으로 탄생하는
        그 순간을 기대합니다!
      </p>
      <hr className="intro--hr" />
    </div>
  );
};
export default Docs;
