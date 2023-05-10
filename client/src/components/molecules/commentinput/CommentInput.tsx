import React, { useState } from 'react';

// atoms import
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
// post api import
import { postComment } from 'services/board';

interface CommentProps {
  boardid: number;
}

const CommentInput = ({ boardid }: CommentProps) => {
  const [comment, setComment] = useState<string>('');

  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const postCommentData = () => {
    postComment(
      boardid,
      comment,
      ({ data }) => {
        console.log(data);
      },
      (error) => {
        console.log('error :', error);
      }
    );
    setComment('');
  };

  return (
    <div>
      <Button
        label="등록"
        type="submit"
        color="other"
        onClick={postCommentData}
        size="small"
      />
      <TextInput
        label="댓글을 입력해주세요"
        value={comment}
        onChange={onChangeComment}
      />
    </div>
  );
};

export default CommentInput;
