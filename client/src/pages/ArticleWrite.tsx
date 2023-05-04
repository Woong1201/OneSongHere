import { useNavigate } from 'react-router-dom';
import { Button } from 'components/atoms/buttons/Button';
import { TextInput } from 'components/atoms/inputs/TextInput';

const ArticleWrite = () => {
  const navigate = useNavigate();
  // 취소 클릭 시 뒤로 가도록 하는 함수
  const goBack = () => {
    navigate(-1);
  };
  // 렌더링
  return (
    <>
      <div>커뮤니티 글쓰는 페이지</div>
      <div>입니다</div>
      <div>
        <h1>제목</h1>
        <TextInput label="제목을 입력해주세요" value="" stroke />
      </div>
      <Button label="등록" type="submit" color="primary" />
      <Button label="취소" type="button" onClick={goBack} />
    </>
  );
};

export default ArticleWrite;
