import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// atoms import
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
// post api import
import { postComment } from 'services/board';
// SCSS import
import './CommentInput.scss';

interface CommentProps {
  boardid: number;
}

const CommentInput = ({ boardid }: CommentProps) => {
  const [comment, setComment] = useState<string>('');
  const onChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const navigate = useNavigate();

  const postCommentData = () => {
    postComment(
      boardid,
      comment,
      () => {
        // 댓글 생성 후 동일 페이지로 재이동
        navigate(0);
      },
      (error) => {
        console.log('댓글 등록 에러 :', error);
      }
    );
    setComment('');
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
      className={
        width > 964 ? 'comment__input--medium' : 'comment__input--small'
      }
    >
      <div>
        <textarea
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={onChangeComment}
          cols={104}
          rows={2}
          className={
            width > 964
              ? 'comment__input--inputTextarea'
              : 'comment__input--inputTextarea-small'
          }
        />
      </div>
      <div className="comment__input--button">
        <Button
          label="등록"
          type="submit"
          color="primary"
          onClick={postCommentData}
          size="small"
        />
      </div>
    </div>
  );
};

export default CommentInput;
