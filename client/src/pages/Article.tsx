import React, { useState, useEffect } from 'react';
import ArticleHeader from 'components/molecules/articleheader/ArticleHeader';
import { getArticle } from 'services/board';
import { useParams } from 'react-router-dom';

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
    <>
      <ArticleHeader />
      {articleInfo?.boardContent}
      {articleInfo?.boardDate}
      {articleInfo?.boardId}
      {articleInfo?.boardTitle}
      {articleInfo?.header}
      {articleInfo?.nickName}
      {articleInfo?.userId}
      {articleInfo?.commentResponses.map((comment) => (
        <div key={comment.commentId}>
          <div>{comment.nickName}</div>
          <div>{comment.commentContent}</div>
          <div>{comment.commentDate}</div>
        </div>
      ))}
      <div>게시글 헤더 molecules</div>
      <div>제목</div>
      <div>프로필아이콘</div>
      <div>이름</div>
      <div>날짜</div>
      <div>조회수</div>
      <div>댓글 수</div>
      <div>본문</div>
      <div>댓글 영역</div>
      <div>댓글 목록 molecules</div>
      <div>댓글 atom </div>
      <div>댓글 입력 atom</div>
    </>
  );
};

export default Article;
