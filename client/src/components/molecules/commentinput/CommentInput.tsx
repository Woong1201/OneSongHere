import React, { useState } from 'react';

// atoms import
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
// post api import
import { postComment } from 'services/board';
// SCSS import
import './CommentInput.scss';

interface CommentResponse {
  commentId: number;
  userId: number;
  nickName: string;
  commentContent: string;
  commentDate: string;
}

interface CommentProps {
  boardid: number;
  onAddComment: (comment: CommentResponse) => void;
}

const CommentInput = ({ boardid, onAddComment }: CommentProps) => {
  const [comment, setComment] = useState<string>('');
  const [addComment, setAddComment] = useState<CommentResponse>();
  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const postCommentData = () => {
    postComment(
      boardid,
      comment,
      ({ data }) => {
        console.log(data);
        setAddComment(data.commentResponses);
        console.log('addComment : ', addComment);
      },
      (error) => {
        console.log('error :', error);
      }
    );
    // onAddComment(addComment);
    setComment('');
    console.log('addComment2 : ', addComment);
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
