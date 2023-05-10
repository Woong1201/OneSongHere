import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from 'services/board';
// 컴포넌트 import
import ArticleHeader from 'components/molecules/articleheader/ArticleHeader';
import CommentInput from 'components/molecules/commentinput/CommentInput';
import CommentLine from 'components/molecules/commentline/CommentLine';
// SCSS import
import './Article.scss';

interface CommentResponse {
  commentId: number;
  userId: number;
  nickName: string;
  commentContent: string;
  commentDate: string;
}

interface BoardResponse {
  boardId: number;
  userId: number;
  nickName: string;
  boardTitle: string;
  header: string;
  boardContent: string;
  boardDate: string;
  commentResponses: CommentResponse[];
}

const Article = () => {
  const boardId = useParams();
  const [articleInfo, getArticleInfo] = useState<BoardResponse>();
  useEffect(() => {
    getArticle(
      Number(boardId.articleId),
      ({ data }) => {
        console.log('data :', data);
        getArticleInfo(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <div className="article__entire">
      <div className="article__container">
        <div>게시글 헤더 molecules</div>
        {articleInfo?.header}
        <ArticleHeader />
        <div>제목</div>
        {articleInfo?.boardTitle}
        <div>이름</div>
        {articleInfo?.nickName}
        <div>본문</div>
        {articleInfo?.boardContent}
        {articleInfo?.boardDate}
        <div>날짜</div>
        {articleInfo?.boardId}
        {articleInfo?.userId}
        <div className="comments__container--header">
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            댓글 수
            <div
              style={{
                marginLeft: '15px',
                color: '#4642FF',
                fontWeight: 'bold',
              }}
            >
              {articleInfo?.commentResponses.length}
            </div>
          </div>
        </div>
        <div className="comments__container--lines">
          {articleInfo?.commentResponses.map((comment) => (
            <div key={comment.commentId}>
              <CommentLine
                nickname={comment.nickName}
                content={comment.commentContent}
                date={comment.commentDate}
              />
            </div>
          ))}
        </div>
        {/* <div>프로필아이콘</div>
        <div>조회수</div> */}
        <CommentInput boardid={Number(boardId.articleId)} />
      </div>
    </div>
  );
};

export default Article;
