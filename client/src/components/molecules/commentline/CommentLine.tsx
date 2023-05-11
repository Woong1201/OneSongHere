import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentLine.scss';
import TextButton from 'components/atoms/buttons/TextButton';

// api import
import { deleteComment } from 'services/board';

interface CommentProps {
  commentId: number;
  nickname: string;
  content: string;
  date: string;
  userId: number;
  loginId?: number;
}

const CommentLine = ({
  commentId,
  nickname,
  content,
  date,
  userId,
  loginId,
}: CommentProps) => {
  // 인자로 받아온 date에 + 9시간 (한국시간)
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);

  const navigate = useNavigate();

  const deleteCommentData = () => {
    deleteComment(
      commentId,
      ({ data }) => {
        console.log('data:', data);
        navigate(0);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="comment__container">
      <div className="comment__header">
        <div>{nickname}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {String(newDate.getUTCFullYear())}.
          {`0${String(newDate.getMonth() + 1)}`.slice(-2)}.
          {`0${String(newDate.getDate())}`.slice(-2)}
          &nbsp;&nbsp;
          {`0${String(newDate.getHours())}`.slice(-2)}:
          {`0${String(newDate.getMinutes())}`.slice(-2)}
          {loginId === userId ? (
            <p>
              &nbsp;&nbsp;
              <TextButton label="삭제" onClick={deleteCommentData} />
            </p>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', textAlign: 'start' }}>{content}</div>
    </div>
  );
};

export default CommentLine;
