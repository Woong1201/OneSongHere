// 컴포넌트 import
import SearchBar from 'components/molecules/searchsection/SearchBar';
import Button from 'components/atoms/buttons/Button';
import TextButton from 'components/atoms/buttons/TextButton';
import ArticleBoard from 'components/organisms/board/ArticleBoard';
import { useNavigate } from 'react-router-dom';
// api import
import { getCategorized } from 'services/board';
import './Board.scss';

const Board = () => {
  const navigate = useNavigate();
  const navigateWritePage = () => {
    navigate('/board/write');
  };

  const categorization = (search: string) => () => {
    getCategorized(
      'header',
      search,
      ({ data }) => {
        console.log('구인 클릭함');
        console.log(search, ': 구인 데이터', data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <div className="category__container">
        {/* onclick으로 카테고리에 맞게 아티클들 필터링할 수 있게 해줘야 함 */}
        <TextButton label="구인" onClick={categorization('구인')} />
        <TextButton label="질문" onClick={categorization('질문')} />
        <TextButton label="홍보" onClick={categorization('홍보')} />
        <TextButton label="잡담" onClick={categorization('잡담')} />
      </div>
      <div className="board__container">
        <div>커뮤니티 전체 페이지</div>
        <div>입니다</div>
        <SearchBar />
        <Button
          label="글쓰기"
          type="submit"
          color="primary"
          onClick={navigateWritePage}
        />
        <ArticleBoard />
      </div>
    </div>
  );
};

export default Board;
