import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LoginState } from 'store/LoginState';
// 컴포넌트 import
import SearchBar from 'components/molecules/searchsection/SearchBar';
import Button from 'components/atoms/buttons/Button';
import TextButton from 'components/atoms/buttons/TextButton';
import ArticleBoard from 'components/organisms/board/ArticleBoard';
import { useNavigate } from 'react-router-dom';
// api import
import { getCategorized } from 'services/board';
import './Board.scss';

interface Article {
  boardId: number;
  userId: number;
  nickName: string;
  boardTitle: string;
  header: string;
  boardDate: string;
}

const Board = () => {
  // 글쓰기 페이지로 이동
  const navigate = useNavigate();
  const navigateWritePage = () => {
    console.log(LoginState);
    navigate('/board/write');
  };

  // 카테고리 버튼을 누르면 getCategorized api로 뽑아온 데이터를
  // getArticleBoard에 넣어 Article 형식에 맞게 바꾼 articles로 반환한다
  const [articles, getArticleBoard] = useState<Article[]>([]);
  const categorization = (search: string) => () => {
    getCategorized(
      'header',
      search,
      ({ data }) => {
        console.log(search, '로 찾은 데이터', data);
        getArticleBoard(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // Login 여부 확인
  const isLoginQ = useRecoilValue(LoginState);

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
        {isLoginQ ? (
          <Button
            label="글쓰기"
            type="submit"
            color="primary"
            onClick={navigateWritePage}
          />
        ) : (
          <div style={{ height: '38px' }} />
        )}
        <ArticleBoard filteredArticles={articles} />
      </div>
    </div>
  );
};

export default Board;
