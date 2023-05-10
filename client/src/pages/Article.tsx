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
  // articleInfo가 undefined가 될 수 있어 ArticleHeader로 보낼때 에러가 뜨므로 처음부터 문자열로 변환
  const strHeader = String(articleInfo?.header);
  const strTitle = String(articleInfo?.boardTitle);
  const strNickname = String(articleInfo?.nickName);
  const strDate = String(articleInfo?.boardDate);

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
        <ArticleHeader
          header={strHeader}
          title={strTitle}
          nickname={strNickname}
          date={strDate}
        />
        <div>본문</div>
        {articleInfo?.boardContent}
        {/* {articleInfo?.boardId}
        {articleInfo?.userId} */}
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
      </div>
      <CommentInput boardid={Number(boardId.articleId)} />
    </div>
  );
};

export default Article;
