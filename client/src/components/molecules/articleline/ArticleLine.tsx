import React from 'react';
import './ArticleLine.scss';

import TextButton from 'components/atoms/buttons/TextButton';

interface ArticleLineProps {
  //   게시글 번호
  boardId: number;
  //   유저 번호
  userId: number;
  //   글쓴이
  nickName: string;
  //   게시글 제목
  boardTitle: string;
  //   헤더
  header: string;
  //   생성 날짜
  boardDate: string;
}

const ArticleLine = ({
  boardId,
  userId,
  nickName,
  boardTitle,
  header,
  boardDate,
}: ArticleLineProps) => {
  return (
    <>
      <td>{boardId}</td>
      <td>{header}</td>
      <td>
        <TextButton label={boardTitle} to={`/board/${String(boardId)}`} />
      </td>
      {/* <td>{userId}</td> */}
      <td>
        <TextButton label={nickName} />
      </td>
      <td>{boardDate}</td>
      {/* <p className="articleline"> */}

      {/* </p> */}
    </>
  );
};

export default ArticleLine;
