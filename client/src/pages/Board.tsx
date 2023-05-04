import ArticleLine from 'components/molecules/articleline/ArticleLine';
import SearchBar from 'components/molecules/searchsection/SearchBar';
import { Button } from 'components/atoms/buttons/Button';
import TextButton from 'components/atoms/buttons/TextButton';
import { useNavigate } from 'react-router-dom';
import './Board.scss';

const Board = () => {
  const navigate = useNavigate();
  const navigateWritePage = () => {
    navigate('/board/write');
  };

  return (
    <div className="board__container">
      <div>커뮤니티 전체 페이지</div>
      <div>입니다</div>
      <SearchBar label="검색어를 입력하세요" />
      <Button
        label="글쓰기"
        type="submit"
        color="primary"
        onClick={navigateWritePage}
      />
      <div className="category__container">
        {/* onclick으로 카테고리에 맞게 아티클들 필터링할 수 있게 해줘야 함 */}
        <TextButton label="구인" />
        <TextButton label="질문" />
        <TextButton label="홍보" />
        <TextButton label="잡담" />
      </div>
      <ArticleLine
        num={1}
        title="what"
        commentCnt={2}
        writer="are"
        birthday="you doing"
      />
    </div>
  );
};

export default Board;
