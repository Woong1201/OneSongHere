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
  // 작성 날짜와 현재 날짜 비교하여 게시글 작성 날짜 다르게 출력
  const todayDate = new Date();
  const postedDate = new Date(boardDate);
  postedDate.setHours(postedDate.getHours() + 9);
  console.log('오늘시간', todayDate.getTime());
  todayDate.setHours(0, 0, 0, 0);
  console.log(todayDate, postedDate);
  // 오늘 아침 정각보다 빠르면 일로, 아니면 시간으로
  const diffMSec = todayDate.getTime() - postedDate.getTime();

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
      <td>
        {/* 날짜 출력용 삼항연산자 */}
        {Math.floor(diffMSec) < 0 ? (
          <div>
            {`0${String(postedDate.getHours())}`.slice(-2)}:
            {`0${String(postedDate.getMinutes())}`.slice(-2)}
          </div>
        ) : (
          <div>
            {String(postedDate.getUTCFullYear())}.
            {`0${String(postedDate.getMonth() + 1)}`.slice(-2)}.
            {`0${String(postedDate.getDate())}`.slice(-2)}
          </div>
        )}
      </td>
    </>
  );
};

export default ArticleLine;
