import React, { useState, useEffect } from 'react';
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
  //   공백 출력 여부
  isEmptyOutput: boolean;
}

const ArticleLine = ({
  boardId,
  userId,
  nickName,
  boardTitle,
  header,
  boardDate,
  isEmptyOutput,
}: ArticleLineProps) => {
  // 작성 날짜와 현재 날짜 비교하여 게시글 작성 날짜 다르게 출력
  const todayDate = new Date();
  const postedDate = new Date(boardDate);
  postedDate.setHours(postedDate.getHours() + 9);
  // 오늘 아침 정각보다 빠르면 날짜로, 아니면 시간으로 하도록, diffMsec 계산
  todayDate.setHours(0, 0, 0, 0);
  const diffMSec = todayDate.getTime() - postedDate.getTime();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // 850 <-> 500
  return width >= 850 ? (
    <>
      <td>{isEmptyOutput ? '' : boardId}</td>
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
        {!isEmptyOutput && (
          <div>
            {diffMSec < 0 ? (
              <>
                {`0${String(postedDate.getHours())}`.slice(-2)}:
                {`0${String(postedDate.getMinutes())}`.slice(-2)}
              </>
            ) : (
              <>
                {String(postedDate.getUTCFullYear())}.
                {`0${String(postedDate.getMonth() + 1)}`.slice(-2)}.
                {`0${String(postedDate.getDate())}`.slice(-2)}
              </>
            )}
          </div>
        )}
      </td>
    </>
  ) : (
    <td>
      &#91;
      {header}
      &#93;
      <TextButton label={boardTitle} to={`/board/${String(boardId)}`} />
      <div className="smallcontainer">
        <div>
          <div>
            {String(postedDate)}
            {diffMSec < 0 ? (
              <>
                {`0${String(postedDate.getHours())}`.slice(-2)}:
                {`0${String(postedDate.getMinutes())}`.slice(-2)}
              </>
            ) : (
              <>
                {String(postedDate.getUTCFullYear())}.
                {`0${String(postedDate.getMonth() + 1)}`.slice(-2)}.
                {`0${String(postedDate.getDate())}`.slice(-2)}
              </>
            )}
          </div>
          {nickName}
        </div>
      </div>
    </td>
  );
};

export default ArticleLine;
