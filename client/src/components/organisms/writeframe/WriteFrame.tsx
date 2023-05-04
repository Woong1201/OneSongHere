import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
import './WriteFrame.scss';

const WriteFrame = () => {
  const [title, setTitle] = useState<string>('');

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // axios 성공하면 커뮤니티 메인 페이지로
  };

  const navigate = useNavigate();
  // 취소 클릭 시 뒤로 가도록 하는 함수
  const goBack = () => {
    navigate(-1);
  };

  // 렌더링
  return (
    <div className="write">
      <form onSubmit={onSubmit}>
        <div>
          <div className="write__label">제목</div>
          <TextInput
            label="제목을 입력해주세요"
            value={title}
            stroke
            onChange={onChangeTitle}
          />
        </div>
        <div className="write__buttons">
          <Button label="등록" type="submit" color="primary" />
          <Button label="취소" type="button" onClick={goBack} />
        </div>
      </form>
    </div>
  );
};

export default WriteFrame;
