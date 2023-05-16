import './ArticleWrite.scss';
import WriteFrame from 'components/organisms/writeframe/WriteFrame';

const ArticleWrite = () => {
  // 렌더링
  return (
    <div>
      <WriteFrame isUpdate={false} />
    </div>
  );
};

export default ArticleWrite;
