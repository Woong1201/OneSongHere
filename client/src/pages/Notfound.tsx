import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <>
      <div>지정되어 있지 않은 경로입니다!</div>
      <div>헤더의 로고를 클릭하거나 아래 링크를 눌러서</div>
      <div>메인페이지로 돌아가주세요</div>
      <Link to="/">메인 페이지</Link>
    </>
  );
};
export default Notfound;
