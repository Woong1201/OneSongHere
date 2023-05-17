import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle, deleteArticle } from 'services/board';
// 컴포넌트 import
import ArticleHeader from 'components/molecules/articleheader/ArticleHeader';
import CommentInput from 'components/molecules/commentinput/CommentInput';
import CommentLine from 'components/molecules/commentline/CommentLine';
import WriteFrame from 'components/organisms/writeframe/WriteFrame';
// SCSS import
import './Article.scss';
// recoil 관련 import
import User from 'types/User';
import { UserState } from 'store/UserState';
import { useRecoilState } from 'recoil';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiLeadPencil } from '@mdi/js';

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
  const strContent = String(articleInfo?.boardContent);

  // 로그인 여부에 따라 댓글 입력창 닫아놓기 위해
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    // 게시글 내용 get
    getArticle(
      Number(boardId.articleId),
      ({ data }) => {
        getArticleInfo(data);
        getComments(data.commentResponses);
      },
      (error) => {
        console.log('게시글 가져오기 에러:', error);
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

  const [isUpdate, setIsUpdate] = useState(false);
  const goToUpdate = () => {
    setIsUpdate(true);
  };
  const deleteArticleData = () => {
    deleteArticle(
      Number(boardId.articleId),
      () => {
        navigate('/board');
      },
      (error) => {
        console.log('게시글 삭제 에러:', error);
      }
    );
  };

  return (
    <div className="article__entire">
      {isUpdate ? (
        <div>
          <WriteFrame
            isUpdate
            uId={Number(boardId.articleId)}
            uTitle={strTitle}
            uCategory={strHeader}
            uContent={strContent}
          />
        </div>
      ) : (
        <div className="article__container">
          <ArticleHeader
            header={strHeader}
            title={strTitle}
            picture={strPicture}
            nickname={strNickname}
            date={strDate}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="article__content">{articleInfo?.boardContent}</div>
          </div>

          {user ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={goToUpdate}
                className="article__button"
              >
                <Icon path={mdiLeadPencil} size={0.7} />
                &nbsp;수정
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                onClick={deleteArticleData}
                className="article__button"
              >
                <Icon path={mdiTrashCanOutline} size={0.7} />
                &nbsp;삭제
              </button>
            </div>
          ) : (
            <div />
          )}

          <div className="comments__container--header">
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              댓글
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '18px',
              marginBottom: '20px',
            }}
          >
            {/* 로그인 여부에 따라 댓글 입력창 출력 */}

            {user ? (
              <CommentInput boardid={Number(boardId.articleId)} />
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
