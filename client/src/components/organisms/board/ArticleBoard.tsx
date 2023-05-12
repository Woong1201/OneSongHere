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

const ArticleBoard = ({
  filteredArticles,
}: {
  filteredArticles: Article[];
}) => {
  // 로딩 여부 관리
  const [isLoading, setIsLoading] = useState(false);

  const [articles, getArticleBoard] = useState<Article[]>([]);
  useEffect(() => {
    setIsLoading(true);
    // 파라미터로 받은 값(필터링된 데이터)의 길이가 0보다 크다면(필터링 되었다면)
    if (filteredArticles.length > 0) {
      // 필터된 데이터로 useState 실행하여 articles의 값 갱신(최신순 정렬을 위해 역순으로)
      getArticleBoard([...filteredArticles].reverse());
    } else {
      getArticleBoard([]);
      // 아니면 그냥 api로 back에서 데이터 가져옴
      // getBoards(
      //   ({ data }) => {
      //     console.log(data, 'and ', typeof data);
      //     // 최신순으로 출력되도록 역순으로 담는다.
      //     getArticleBoard(data.reverse());
      //     console.log('articles :', articles);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    }
    setIsLoading(false);
  }, [filteredArticles]);
  // useEffect의 deps 배열에 [filteredArticles]를 넣어 컴포넌트가 마운트 되거나,
  // 해당 값이 바뀔 때 함수가 호출되도록 함

  return (
    <div>
      {isLoading ? (
        <div>로딩 중입니다...</div>
      ) : (
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
      )}
    </div>
  );
};

export default ArticleBoard;
