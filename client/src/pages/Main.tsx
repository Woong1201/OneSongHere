import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <div>메인페이지</div>
      <div>구성 ㄱㄱ</div>
      <Link to="/compose"> 작곡 페이지 </Link>
    </>
  );
}
