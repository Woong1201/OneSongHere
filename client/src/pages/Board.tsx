import ArticleLine from 'components/molecules/articleline/ArticleLine';

const Board = () => {
  return (
    <>
      <div>커뮤니티 전체 페이지</div>
      <div>입니다</div>
      <ArticleLine
        num={1}
        title="what"
        commentCnt={2}
        writer="are"
        birthday="you doing"
      />
    </>
  );
};

export default Board;
