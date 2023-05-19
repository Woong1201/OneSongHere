import TextInput from 'components/atoms/inputs/TextInput';
import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import './AlbumModal.scss';
import SectionTitle from 'components/atoms/common/SectionTitle';
import CardTitle from 'components/atoms/common/CardTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { createAlbumCover, postAlbum } from 'services/album';
import User from 'types/User';
import { Note } from 'types/Note';
import { Oval } from 'react-loader-spinner';

interface AlbumModalProps {
  notes: Array<Note>;
  onClickModal: () => void;
}

const AlbumModal = ({ notes, onClickModal }: AlbumModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState<string>('');
  const { relayStudioId } = useParams();
  const studioId = Number(relayStudioId);
  const [userId, setUserId] = useState<number>(0);
  const albumSheet = JSON.stringify(notes);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserId((JSON.parse(storedUser) as User).userId);
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const genre = inputValue.split(',').map((item) => item.trim());
    const text = [title, content, genre.join(', ')].join(', ');

    const createCover = () => {
      setIsLoading(true);
      createAlbumCover(
        text,
        studioId,
        userId,
        ({ data }) => {
          setImgUrl(data);
        },
        (error) => {
          console.log('앨범 커버 생성 에러:', error);
        }
      );
    };

    createCover();
  };
  useEffect(() => {
    const postAlbumData = () => {
      const genre = inputValue.split(',').map((item) => item.trim());
      postAlbum(
        title,
        content,
        albumSheet,
        genre,
        imgUrl,
        () => {
          setIsLoading(false);
          navigate('/albums');
        },
        (error) => {
          console.log('앨범 데이터 등록 에러:', error);
        }
      );
    };
    if (imgUrl !== '') {
      postAlbumData();
    }
  }, [imgUrl]);

  return (
    <div className="overlay">
      <div className={`modal${isLoading ? '--loading' : ''}`}>
        <div className="modal__title">
          <SectionTitle title="작품 등록" />
        </div>
        <form onSubmit={onSubmit} className="modal__form">
          <div className="modal__album-title">
            <CardTitle title="앨범 제목" />
            <div className="modal__album-title__input">
              <TextInput
                stroke
                label="제목을 입력해주세요"
                value={title}
                short
                onChange={onChangeTitle}
              />
            </div>
          </div>
          <div className="modal__album-content">
            <CardTitle title="내용" />
            <textarea
              className="modal__album-content__input"
              value={content}
              onChange={onChangeContent}
            />
          </div>
          <div className="modal__album-tag">
            <CardTitle title="장르" />
            <div className="modal__album-tag__input">
              <TextInput
                stroke
                label="장르를 선택해주세요"
                value={inputValue}
                short
                onChange={onChangeGenre}
              />
            </div>
          </div>
          <div className="modal__button__container">
            <div className="modal__button">
              <Button
                size="small"
                type="button"
                label="취소"
                onClick={onClickModal}
              />
              <Button
                size="small"
                type="submit"
                label="생성하기"
                color="primary"
              />
            </div>
          </div>
        </form>
        {isLoading && (
          <div className="modal--loading-content">
            <Oval
              height={80}
              width={80}
              color="#4642FF"
              wrapperStyle={{}}
              wrapperClass=""
              visible
              ariaLabel="oval-loading"
              secondaryColor="#ffffff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
            <br />
            앨범 생성 중입니다...
            <br />
            <div className="blank">{}</div>
            <div className="tip">
              Tip! 드럼을 적절히 활용한다면 소리가 더 풍성해진답니다!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumModal;
