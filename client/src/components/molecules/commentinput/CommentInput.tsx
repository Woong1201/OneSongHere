import React, { useState } from 'react';

// atoms import
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
// post api import
import { postComment } from 'services/board';

const CommentInput = () => {
  const [comment, setComment] = useState<string>('');

  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const postCommentData = () => {
    postComment(
      1,
      comment,
      ({ data }) => {
        console.log(data);
      },
      (error) => {
        console.log('error :', error);
      }
    );
  };

  return (
    <div>
      <Button
        label="등록"
        type="submit"
        color="other"
        onClick={postCommentData}
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
