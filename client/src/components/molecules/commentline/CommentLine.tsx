import React from 'react';
import './CommentLine.scss';
import TextButton from 'components/atoms/buttons/TextButton';

interface CommentProps {
  nickname: string;
  content: string;
  date: string;
  userId: number;
  loginId?: number;
}

const CommentLine = ({
  nickname,
  content,
  date,
  userId,
  loginId,
}: CommentProps) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);

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
              <TextButton label="삭제" />
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
