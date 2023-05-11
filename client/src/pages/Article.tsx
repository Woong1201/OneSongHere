import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from 'services/board';
// 컴포넌트 import
import ArticleHeader from 'components/molecules/articleheader/ArticleHeader';
import CommentInput from 'components/molecules/commentinput/CommentInput';
import CommentLine from 'components/molecules/commentline/CommentLine';
// SCSS import
import './Article.scss';
// recoil 관련 import
import User from 'types/User';
import { UserState } from 'store/UserState';
import { useRecoilState } from 'recoil';

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
  // 게시글 정보 useState
  const [articleInfo, getArticleInfo] = useState<BoardResponse>();
  // 댓글 정보 useState
  const [comments, getComments] = useState<CommentResponse[]>([]);
  // articleInfo가 undefined가 될 수 있어 ArticleHeader로 보낼때 에러가 뜨므로 처음부터 문자열로 변환
  const strHeader = String(articleInfo?.header);
  const strTitle = String(articleInfo?.boardTitle);
  const strNickname = String(articleInfo?.nickName);
  const strDate = String(articleInfo?.boardDate);

  // 로그인 여부에 따라 댓글 입력창 닫아놓기 위해
  const [user, setUser] = useRecoilState(UserState);

  const handleAddComment = (comment: CommentResponse) => {
    getComments([...comments, comment]);
  };

  useEffect(() => {
    getArticle(
      Number(boardId.articleId),
      ({ data }) => {
        console.log('data :', data);
        getArticleInfo(data);
        getComments(data.commentResponses);
      },
      (error) => {
        console.log(error);
      }
    );

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    } else {
      setUser(null);
    }
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
      </div>
      <div>
        헤이헤이
        {comments?.map((comment) => (
          <div key={comment.commentId}>
            <CommentLine
              nickname={comment.nickName}
              content={comment.commentContent}
              date={comment.commentDate}
            />
          </div>
        ))}
      </div>
      {user ? (
        <CommentInput
          boardid={Number(boardId.articleId)}
          onAddComment={handleAddComment}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default Article;
