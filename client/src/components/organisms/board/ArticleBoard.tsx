// useState, useEffect import
import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import ArticleLine from 'components/molecules/articleline/ArticleLine';
// SCSS import
import './ArticleBoard.scss';

interface Article {
  boardId: number;
  userId: number;
  nickName: string;
  boardTitle: string;
  header: string;
  boardDate: string;
}

const ArticleBoard = ({
  filteredArticles,
}: {
  filteredArticles: Article[];
}) => {
  // 로딩 여부 관리
  const [isLoading, setIsLoading] = useState(false);
  const [emptyArticles, getEmptyArticles] = useState<Article[]>([]);
  const [articles, getArticleBoard] = useState<Article[]>([]);
  useEffect(() => {
    setIsLoading(true);
    // 파라미터로 받은 값(필터링된 데이터)의 길이가 0보다 크다면(필터링 되었다면)
    if (filteredArticles.length > 0) {
      // 필터된 데이터로 useState 실행하여 articles의 값 갱신(최신순 정렬을 위해 역순으로)
      getArticleBoard([...filteredArticles].reverse());
      const initialEmptyArticles: Article[] = Array.from(
        { length: 20 - [...filteredArticles].length },
        (_, index) => ({
          boardId: index + 1,
          userId: 0,
          nickName: '',
          boardTitle: '',
          header: '',
          boardDate: '',
        })
      );
      getEmptyArticles(initialEmptyArticles);
    } else {
      getArticleBoard([]);
      const initialEmptyArticles: Article[] = Array.from(
        { length: 20 - [...filteredArticles].length },
        (_, index) => ({
          boardId: index + 1,
          userId: 0,
          nickName: '',
          boardTitle: '',
          header: '',
          boardDate: '',
        })
      );
      getEmptyArticles(initialEmptyArticles);
    }
    setIsLoading(false);
  }, [filteredArticles]);
  // useEffect의 deps 배열에 [filteredArticles]를 넣어 컴포넌트가 마운트 되거나,
  // 해당 값이 바뀔 때 함수가 호출되도록 함

  // pagination
  const pageLimit = 20;
  const entirePage = Math.ceil(articles.length / pageLimit);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * pageLimit;
  const pageNumButtons = new Array(entirePage).fill(0).map((_, index) => index);

  // ========================================================================
  // ===============================(  렌 더 링  )============================
  // ========================================================================
  return (
    <div className="aBoard">
      {isLoading ? (
        <div>로딩 중입니다...</div>
      ) : (
        <table className="aBoard__table">
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {articles.slice(offset, offset + pageLimit).map((article) => (
              <tr key={article.boardId} className="test">
                <ArticleLine
                  boardId={article.boardId}
                  boardTitle={article.boardTitle}
                  header={article.header}
                  userId={article.userId}
                  nickName={article.nickName}
                  boardDate={article.boardDate}
                  isEmptyOutput={false}
                />
              </tr>
            ))}
            {emptyArticles.slice(offset, offset + pageLimit).map((article) => (
              <tr key={article.boardId} className="test">
                <ArticleLine
                  boardId={article.boardId}
                  boardTitle={article.boardTitle}
                  header={article.header}
                  userId={article.userId}
                  nickName={article.nickName}
                  boardDate={article.boardDate}
                  isEmptyOutput
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* ======================{페이지네이션 버튼}======================== */}
      <div>
        <button
          className="pagination__Arrow"
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {pageNumButtons.map((item, index) => (
          <button
            type="button"
            key={item}
            onClick={() => setPage(index + 1)}
            className={
              index + 1 === page
                ? 'pagination__number--active'
                : 'pagination__number'
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination__Arrow"
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === entirePage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ArticleBoard;
