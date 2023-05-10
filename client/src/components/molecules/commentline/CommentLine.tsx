import React from 'react';
import './CommentLine.scss';

interface CommentProps {
  nickname: string;
  content: string;
  date: string;
}

const CommentLine = ({ nickname, content, date }: CommentProps) => {
  return (
    <div className="comment__container">
      <div className="comment__header">
        <div>{nickname}</div>
        <div>{date}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default CommentLine;
