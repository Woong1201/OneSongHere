import Comment from './Comment';

interface Article {
  boardId: number;
  userId: number;
  nickName: string;
  boardTitle: string;
  header: string;
  boardContent: string;
  boardDate: string;
  commentResponses: Comment[];
}

export default Article;
