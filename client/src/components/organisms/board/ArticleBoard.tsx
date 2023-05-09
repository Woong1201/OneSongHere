// useState, useEffect import
import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import ArticleLine from 'components/molecules/articleline/ArticleLine';
// api 모듈 import
import { getBoards } from 'services/board';

interface Article {
  boardId: number;
  userId: number;
  nickName: string;
  boardTitle: string;
  header: string;
  boardDate: string;
}

const ArticleBoard = () => {
  const [articles, getArticleBoard] = useState<Article[]>([]);
  useEffect(() => {
    getBoards(
      ({ data }) => {
        console.log(data);
        getArticleBoard(data);
        console.log(articles);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <table>
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
          {articles.map((article) => (
            <tr key={article.boardId} className="test">
              <ArticleLine
                boardId={article.boardId}
                boardTitle={article.boardTitle}
                header={article.header}
                userId={article.userId}
                nickName={article.nickName}
                boardDate={article.boardDate}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleBoard;
