import TextInput from 'components/atoms/inputs/TextInput';
import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import './AlbumModal.scss';
import SectionTitle from 'components/atoms/common/SectionTitle';
import CardTitle from 'components/atoms/common/CardTitle';
// import { useNavigate } from 'react-router-dom';
import { postAlbum } from 'services/album';

interface ModalProps {
  albumSheet?: Array<string>;
  onClickModal: () => void;
}

const Modal = ({ albumSheet = [], onClickModal }: ModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [genre, setGenre] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState<string>('');
  // const navigate = useNavigate();
  const imgUrl =
    'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_org.jpg?61e575e8653e5920470a38d1482d7312/melon/optimize/90';

  useEffect(() => {
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
    const input = event.target.value;
    setInputValue(input);

    if (input.endsWith(' ')) {
      const inputGenres = input.trim().split(' ');
      setGenre([...genre, ...inputGenres]);
      setInputValue('');
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postAlbumData = () => {
      postAlbum(
        title,
        content,
        albumSheet,
        genre,
        imgUrl,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log('error', error);
        }
      );
    };

    postAlbumData();
  };

  return (
    <div className="modal--overlay">
      <div className="modal">
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
          <div className="modal__album-img">
            <CardTitle title="앨범 커버 제작" />
            <img src={imgUrl} alt="cover" className="modal__album-img__input" />
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
      </div>
    </div>
  );
};

export default Modal;
