import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle, deleteArticle } from 'services/board';
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
  picture: string;
  nickName: string;
  commentContent: string;
  commentDate: string;
}

interface BoardResponse {
  boardId: number;
  userId: number;
  picture: string;
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
  const strPicture = String(articleInfo?.picture);
  const strNickname = String(articleInfo?.nickName);
  const strDate = String(articleInfo?.boardDate);

  // 로그인 여부에 따라 댓글 입력창 닫아놓기 위해
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    // 게시글 내용 get
    getArticle(
      Number(boardId.articleId),
      ({ data }) => {
        console.log('data :', data);
        getArticleInfo(data);
        console.log('댓글 :', data.commentResponses);
        getComments(data.commentResponses);
      },
      (error) => {
        console.log(error);
      }
    );
    // 로그인 여부 판별 및 로그인 유저 아이디 등 정보 받아옴
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    } else {
      setUser(null);
    }
  }, []);

  const navigate = useNavigate();

  const deleteArticleData = () => {
    deleteArticle(
      Number(boardId.articleId),
      ({ data }) => {
        console.log(data);
        navigate('/board');
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="article__entire">
      <div className="article__container">
        {user ? (
          <button type="button" onClick={deleteArticleData}>
            삭제
          </button>
        ) : (
          <div />
        )}
        <ArticleHeader
          header={strHeader}
          title={strTitle}
          picture={strPicture}
          nickname={strNickname}
          date={strDate}
        />
        <div>본문</div>
        <div className="article__content">{articleInfo?.boardContent}</div>

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

        {/* 댓글 목록 */}
        <div className="comments__container--lines">
          {comments?.map((comment) => (
            <div key={comment.commentId}>
              <CommentLine
                commentId={comment.commentId}
                nickname={comment.nickName}
                picture={comment.picture}
                content={comment.commentContent}
                date={comment.commentDate}
                userId={comment.userId}
                loginId={user?.userId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 로그인 여부에 따라 댓글 입력창 출력 */}
      {user ? <CommentInput boardid={Number(boardId.articleId)} /> : <div />}
    </div>
  );
};

export default Article;
