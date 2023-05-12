import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentLine.scss';
import TextButton from 'components/atoms/buttons/TextButton';

// api import
import { deleteComment, updateComment } from 'services/board';

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
  // navigate 정의
  const navigate = useNavigate();

  // 댓글 삭제 함수 정의
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
  // 댓글 수정 함수 정의
  const updateCommentData = () => {
    updateComment(
      commentId,
      content,
      ({ data }) => {
        console.log('data: ', data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // 수정/삭제 옵션 버튼 팝업 및 외부 영역 클릭 시 사라지도록
  const popupRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // ⋮ 버튼 클릭 시 팝업 토글(isOpen 상태 토글)
  const togglePopup = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  // 팝업한 영역이 있고, 팝업영역이 클릭된 영역을 포함하지 않을 경우, isOpen을 false로
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);
  // 클릭을 받기 위한 useEffect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

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
            <div style={{ display: 'flex' }}>
              &nbsp;&nbsp;
              <button
                type="button"
                onClick={togglePopup}
                className="commentOption__button"
              >
                ⋮
              </button>
              {isOpen && (
                <div ref={popupRef} className="commentOption__popup">
                  <TextButton label="수정" onClick={updateCommentData} />
                  <div style={{ margin: '4px 0' }} />
                  <TextButton label="삭제" onClick={deleteCommentData} />
                </div>
              )}
            </div>
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
