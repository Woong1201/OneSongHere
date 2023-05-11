import React, { useState } from 'react';
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
  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const navigate = useNavigate();

  const postCommentData = () => {
    postComment(
      boardid,
      comment,
      ({ data }) => {
        console.log('data :', data);
        navigate(0);
      },
      (error) => {
        console.log('error :', error);
      }
    );
    setComment('');
  };

  return (
    <div className="comment__input">
      <TextInput
        label="댓글을 입력해주세요"
        value={comment}
        onChange={onChangeComment}
      />
      <Button
        label="등록"
        type="submit"
        color="primary"
        onClick={postCommentData}
        size="small"
      />
    </div>
  );
};

export default CommentInput;
