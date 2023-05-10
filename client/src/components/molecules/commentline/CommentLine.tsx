import React from 'react';
import './CommentLine.scss';

interface CommentProps {
  nickname: string;
  content: string;
  date: string;
}

const CommentLine = ({ nickname, content, date }: CommentProps) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);

  return (
    <div className="comment__container">
      <div className="comment__header">
        <div>{nickname}</div>
        {/* <div>{date}</div> */}
        <div>
          {String(newDate.getUTCFullYear())}.
          {`0${String(newDate.getMonth() + 1)}`.slice(-2)}.
          {`0${String(newDate.getDate())}`.slice(-2)}
          &nbsp;&nbsp;
          {`0${String(newDate.getHours())}`.slice(-2)}:
          {`0${String(newDate.getMinutes())}`.slice(-2)}
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default CommentLine;
