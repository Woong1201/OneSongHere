import ArticleLine from 'components/molecules/articleline/ArticleLine';
import SearchBar from 'components/molecules/searchsection/SearchBar';
import { Button } from 'components/atoms/buttons/Button';
import TextButton from 'components/atoms/buttons/TextButton';
import { useNavigate } from 'react-router-dom';
import './Board.scss';

interface Article {
  id: number;
  title: string;
  writer: string;
  date: string;
  viewCnt: number;
}
const articles: Article[] = [
  { id: 1, title: 'one', writer: 'oneone', date: '2023.05.04', viewCnt: 3 },
  { id: 2, title: 'two', writer: 'twotwo', date: '2023.05.04', viewCnt: 4 },
];

const Board = () => {
  const navigate = useNavigate();
  const navigateWritePage = () => {
    navigate('/board/write');
  };

  return (
    <div>
      <div className="category__container">
        {/* onclick으로 카테고리에 맞게 아티클들 필터링할 수 있게 해줘야 함 */}
        <TextButton label="구인" />
        <TextButton label="질문" />
        <TextButton label="홍보" />
        <TextButton label="잡담" />
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
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.writer}</td>
                <td>{article.date}</td>
                <td>{article.viewCnt}</td>
                <ArticleLine
                  num={article.id}
                  title={article.title}
                  commentCnt={article.viewCnt}
                  writer={article.writer}
                  birthday={article.date}
                />
              </tr>
            ))}
          </tbody>
        </table>

        <ArticleLine
          num={1}
          title="what"
          commentCnt={2}
          writer="are"
          birthday="you doing"
        />
      </div>
    </div>
  );
};

export default Board;
