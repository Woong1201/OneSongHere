import React from 'react';
import './CommentLine.scss';

interface CommentProps {
  nickname: string;
  content: string;
  date: string;
}

const CommentLine = ({ nickname, content, date }: CommentProps) => {
  return (
    <div>
      안녕하세요
      <div>{nickname}</div>
      <div>{content}</div>
      <div>{date}</div>
    </div>
  );
};

export default CommentLine;
