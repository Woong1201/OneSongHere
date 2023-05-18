import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { LoginState } from 'store/LoginState';
// 컴포넌트 import
import SearchBar from 'components/molecules/searchsection/SearchBar';
import Button from 'components/atoms/buttons/Button';
import TextButton from 'components/atoms/buttons/TextButton';
import ArticleBoard from 'components/organisms/board/ArticleBoard';
import { useNavigate } from 'react-router-dom';
// api import
import { getBoards, getCategorized } from 'services/board';
import './Board.scss';
// spinner import
import { Oval } from 'react-loader-spinner';

// 카테고리 인터페이스
interface Category {
  name: string;
}

// 게시글 인터페이스
interface Article {
  boardId: number;
  userId: number;
  picture: string;
  nickName: string;
  boardTitle: string;
  header: string;
  boardDate: string;
}

const Board = () => {
  // 로딩 여부 관리
  const [isLoading, setIsLoading] = useState(false);

  // 글쓰기 페이지로 이동
  const navigate = useNavigate();
  const navigateWritePage = () => {
    navigate('/board/write');
  };

  // 카테고리 버튼을 누르면 getCategorized api로 뽑아온 데이터를
  // getArticleBoard에 넣어 Article 형식에 맞게 바꾼 articles로 반환한다
  const [articles, getArticleBoard] = useState<Article[]>([]);

  // 카테고리 클릭 관련
  const categories: Category[] = [
    { name: '전체' },
    { name: '구인' },
    { name: '질문' },
    { name: '홍보' },
    { name: '잡담' },
  ];

  const [categoryClick, setCategoryClick] = useState('전체');
  const categorization = useCallback(
    (search: string) => () => {
      setIsLoading(true);
      setCategoryClick(search);
      if (search === '전체') {
        getBoards(
          ({ data }) => {
            getArticleBoard(data);
            setIsLoading(false);
          },
          (error) => {
            console.log('게시판 가져오기 에러:', error);
            setIsLoading(false);
          }
        );
      } else {
        getCategorized(
          'header',
          search,
          ({ data }) => {
            getArticleBoard(data);
            setIsLoading(false);
          },
          (error) => {
            console.log('카테고리 검색 에러:', error);
            setIsLoading(false);
          }
        );
      }
    },
    []
  );

  // Login 여부 확인
  const isLoginQ = useRecoilValue(LoginState);

  // SearchBar용 useState
  const [searchType, setSearchType] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const handleSearchType = (type: string) => {
    setSearchType(type);
  };
  const handleKeyword = (word: string) => {
    setKeyword(word);
  };
  useEffect(() => {
    setIsLoading(true);
    // 검색어가 공백일 경우
    if (keyword === '') {
      getBoards(
        ({ data }) => {
          getArticleBoard(data);
          setIsLoading(false);
        },
        (error) => {
          console.log('게시글 가져오기 에러:', error);
          setIsLoading(false);
        }
      );
    } else {
      getCategorized(
        'title',
        keyword,
        ({ data }) => {
          getArticleBoard(data);
          setIsLoading(false);
        },
        (error) => {
          console.log('카테고리화 에러:', error);
          setIsLoading(false);
        }
      );
    }
  }, [keyword]);

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [writeButtonLeft, setWriteButtonLeft] = useState(360);
  const handleResize = () => {
    // 페이지 너비 조절 시 writeButtonX 갱신
    setWidth(window.innerWidth);
    const pageWidth = window.innerWidth;
    const newWriteButtonLeft = pageWidth > 850 ? 360 : 180;
    setWriteButtonLeft(newWriteButtonLeft);
  };
  useEffect(() => {
    // 처음 마운트 되었을 때 writeButtonX 갱신
    const pageWidth = window.innerWidth;
    const newWriteButtonLeft = pageWidth > 850 ? 360 : 180;
    setWriteButtonLeft(newWriteButtonLeft);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ========================================================================
  // ===============================(  렌 더 링  )============================
  // ========================================================================
  return (
    <div>
      <div
        className={
          width > 1130 ? 'category__container' : 'category__container--small'
        }
      >
        {categories.map((category) => (
          <div
            key={category.name}
            className={
              categoryClick === category.name
                ? 'category__active'
                : 'category__inactive'
            }
          >
            <TextButton
              label={category.name}
              onClick={categorization(category.name)}
            />
            &nbsp;
          </div>
        ))}
      </div>
      <div className="board__page">
        <div className="board__banner">
          <div className="board__banner--title">커뮤니티</div>
        </div>
        <div
          className={
            width > 1130 ? 'board__container' : 'board__container-small'
          }
        >
          <SearchBar
            onChangeSearchType={() => handleSearchType('TITLE')}
            onChangeKeyword={handleKeyword}
            whiteMode
          />
          {isLoginQ ? (
            <div
              className="board__write--button"
              style={{ left: `${writeButtonLeft}px` }}
            >
              <Button
                label="글쓰기"
                type="submit"
                color="primary"
                onClick={navigateWritePage}
              />
            </div>
          ) : (
            <div style={{ height: '38px' }} />
          )}
          {isLoading ? (
            <div>
              <Oval
                height={80}
                width={80}
                color="#4642FF"
                wrapperStyle={{}}
                wrapperClass=""
                visible
                ariaLabel="oval-loading"
                secondaryColor="#C1B8F5"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
              <br />
              로딩 중입니다...
            </div>
          ) : (
            <ArticleBoard filteredArticles={articles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
