import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentLine.scss';
import TextButton from 'components/atoms/buttons/TextButton';
import ProfileImage from 'components/atoms/profile/ProfileImage';

// api import
import { deleteComment, updateComment } from 'services/board';
import TextInput from 'components/atoms/inputs/TextInput';
import Button from 'components/atoms/buttons/Button';

interface CommentProps {
  commentId: number;
  nickname: string;
  picture: string;
  content: string;
  date: string;
  userId: number;
  loginId?: number;
}

const CommentLine = ({
  commentId,
  nickname,
  picture,
  content,
  date,
  userId,
  loginId,
}: CommentProps) => {
  const [comment, setComment] = useState<string>('');
  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  // 인자로 받아온 date에 + 9시간 (한국시간)
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);
  // navigate 정의
  const navigate = useNavigate();

  // 댓글 삭제 함수 정의
  const deleteCommentData = () => {
    deleteComment(
      commentId,
      () => {
        navigate(0);
      },
      (error) => {
        console.log('댓글 삭제 에러:', error);
      }
    );
  };

  // 댓글 수정 함수 정의
  const updateCommentData = () => {
    updateComment(
      commentId,
      comment,
      () => {
        navigate(0);
      },
      (error) => {
        console.log('댓글 수정 에러:', error);
      }
    );
  };

  // 전체 영역 설정
  const containerRef = useRef<HTMLDivElement>(null);
  // 수정/삭제 옵션 버튼 팝업 및 외부 영역 클릭 시 사라지도록
  const popupRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // 수정 창이 활성화되어 있느냐의 상태
  const [letsUpdate, setLetsUpdate] = useState(false);

  // ⋮ 버튼 클릭 시 팝업 토글(isOpen 상태 토글)
  const togglePopup = () => {
    if (!letsUpdate) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };
  // 팝업한 영역이 있고, 팝업영역이 클릭된 영역을 포함하지 않을 경우, isOpen을 false로
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setLetsUpdate(false);
    }
  }, []);
  // 클릭을 받기 위한 useEffect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // 수정 버튼을 누르면 수정 입력 영역으로 전환 및 팝업을 off
  const letsGoUpdate = () => {
    setLetsUpdate(true);
    setIsOpen(false);
  };

  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    // 페이지 너비 조절 시 writeButtonX 갱신
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        width > 964 ? 'comment__container--medium' : 'comment__container--small'
      }
    >
      <div className="comment__header">
        <div style={{ display: 'flex' }}>
          <ProfileImage
            imageUrl={picture}
            size="small"
            arrangement="horizontal"
          />
          &nbsp;&nbsp;
          <div style={{ display: 'flex', alignSelf: 'center' }}>{nickname}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: '#C1B8F5' }}>
            {String(newDate.getUTCFullYear())}.
            {`0${String(newDate.getMonth() + 1)}`.slice(-2)}.
            {`0${String(newDate.getDate())}`.slice(-2)}
            &nbsp;&nbsp;
            {`0${String(newDate.getHours())}`.slice(-2)}:
            {`0${String(newDate.getMinutes())}`.slice(-2)}
          </div>
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
                <div
                  ref={popupRef}
                  className={
                    width > 964
                      ? 'commentOption__popup'
                      : 'commentOption__popup--small'
                  }
                >
                  <TextButton label="수정" onClick={letsGoUpdate} />
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
      {letsUpdate ? (
        <div className="commentUpdateSpace">
          <TextInput
            label={content}
            value={comment}
            onChange={onChangeComment}
          />
          <Button
            label="등록"
            type="submit"
            color="primary"
            onClick={updateCommentData}
            size="small"
          />
        </div>
      ) : (
        <div style={{ display: 'flex', textAlign: 'start' }}>{content}</div>
      )}
    </div>
  );
};

export default CommentLine;
