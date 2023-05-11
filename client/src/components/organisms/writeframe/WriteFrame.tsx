import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
import { postArticle } from 'services/board';
import './WriteFrame.scss';

const WriteFrame = () => {
  // 제목, 헤더(카테고리), 내용 - useState 정의 및 초기화
  const [title, setTitle] = useState<string>('');
  const [header, setHeader] = useState<string>('');
  const [content, setContent] = useState<string>('');

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

  const getCsrfToken = (): string => {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return 'error';
  };

  const csrftoken = getCsrfToken();
  console.log('csrftoken :', csrftoken);

  const postArticleData = () => {
    postArticle(
      title,
      '잡담',
      '복날송 리메이크 정말 끝내주네요...',
      // csrftoken,
      ({ data }) => {
        console.log(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
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
          <Button
            label="등록"
            type="submit"
            color="primary"
            onClick={postArticleData}
          />
          <Button label="취소" type="button" onClick={goBack} />
        </div>
      </form>
    </div>
  );
};

export default WriteFrame;
