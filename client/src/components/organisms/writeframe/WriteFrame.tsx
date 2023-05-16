import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import TextInput from 'components/atoms/inputs/TextInput';
import { postArticle, updateArticle } from 'services/board';
import './WriteFrame.scss';

// 카테고리 인터페이스
interface Category {
  name: string;
}

// 수정 인터페이스
interface Update {
  isUpdate: boolean;
  uId?: number;
  uTitle?: string;
  uCategory?: string;
  uContent?: string;
}

const WriteFrame = ({
  isUpdate = false,
  uId,
  uTitle,
  uCategory,
  uContent,
}: Update) => {
  // 제목, 헤더(카테고리), 내용 - useState 정의 및 초기화
  const [title, setTitle] = useState<string>('');
  const [header, setHeader] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // 받아온 제목, 카테고리, 내용이 ?이므로 undefined로 받아오면 아래 비교단에서 에러가 나므로 형변환
  const strTitle = String(uTitle);
  const strCategory = String(uCategory);
  const strContent = String(uContent);
  const numId = Number(uId);
  useEffect(() => {
    setHeader(strCategory);
  }, []);

  // 카테고리(헤더) 관련
  const categories: Category[] = [
    { name: '구인' },
    { name: '질문' },
    { name: '홍보' },
    { name: '잡담' },
  ];

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const clickCategory = (category: string) => {
    setHeader(category);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
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

  const postArticleData = () => {
    // 백엔드 쪽에 새로운 게시글 정보 post
    postArticle(
      title,
      header,
      content,
      ({ data }) => {
        console.log(data);
        // 커뮤니티 board 페이지로 이동
        navigate('/board');
      },
      (error) => {
        console.log('error', error);
      }
    );
  };

  const updateArticleData = () => {
    console.log(numId, title, header, content);
    updateArticle(
      numId,
      title,
      header,
      content,
      ({ data }) => {
        console.log(data);
        // 커뮤니티 board 페이지로 이동
        navigate('/board');
      },
      (error) => {
        console.log('update error : ', error);
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
            label={strTitle === 'undefined' ? '제목을 입력해주세요' : strTitle}
            value={title}
            stroke
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <div className="write__label">카테고리</div>
          <div className="write__categories">
            {categories.map((category) => (
              <Button
                key={category.name}
                onClick={() => clickCategory(category.name)}
                type="button"
                tag
                label={category.name}
                color={header === category.name ? 'primary' : 'other'}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="write__label">본문</div>
          <textarea
            placeholder={
              strContent === 'undefined' ? '내용을 입력해주세요' : strContent
            }
            value={content}
            onChange={onChangeContent}
            cols={60}
            rows={10}
            className="inputTextarea"
          />
        </div>
        <div className="write__buttons">
          <Button
            label="등록"
            type="submit"
            color="primary"
            onClick={isUpdate ? updateArticleData : postArticleData}
          />
          &nbsp;&nbsp;
          <Button label="취소" type="button" onClick={goBack} />
        </div>
      </form>
    </div>
  );
};

export default WriteFrame;
