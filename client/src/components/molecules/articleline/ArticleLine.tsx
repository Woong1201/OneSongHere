import React from 'react';
import './ArticleLine.scss';

import TextButton from 'components/atoms/buttons/TextButton';

interface ArticleLineProps {
  //   게시글 번호
  num: number;
  //   게시글 제목
  title: string;
  //   댓글 개수
  commentCnt: number;
  //   글쓴이
  writer: string;
  //   생성 날짜
  birthday: string;
}

const ArticleLine = ({
  num,
  title,
  commentCnt,
  writer,
  birthday,
}: ArticleLineProps) => {
  return (
    <div>
      <div>{num}</div>
      <TextButton label={title} to={`/board/${String(num)}`} />
      <div>{commentCnt}</div>
      <TextButton label={writer} />
      <div>{birthday}</div>
    </div>
  );
};

export default ArticleLine;
