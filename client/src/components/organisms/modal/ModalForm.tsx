import TextInput from 'components/atoms/inputs/TextInput';
import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import './ModalForm.scss';
import SectionTitle from 'components/atoms/common/SectionTitle';
import CardTitle from 'components/atoms/common/CardTitle';
import { postRelayStudio } from 'services/studio';
import { useNavigate } from 'react-router-dom';
import UpDownInput from 'components/atoms/inputs/UpDownInput';

interface ModalProps {
  onClickModal: () => void;
}

const Modal = ({ onClickModal }: ModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<Array<string>>([]);
  const [limitOfUsers, setLimitOfUsers] = useState<number>(0);
  const [numberOfBars, setNumberOfBars] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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

  const onChangeLimitOfUsers = (value: number) => {
    // console.log(value);
    setLimitOfUsers(value);
  };

  const onChangeNumberOfBars = (value: number) => {
    setNumberOfBars(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(title);
    console.log(limitOfUsers);
    console.log(numberOfBars);

    const postRelayStudioData = () => {
      postRelayStudio(
        title,
        limitOfUsers,
        numberOfBars,
        genre,
        ({ data }) => {
          console.log(data);
          const { relayStudioID } = data;
          navigate(`/relay/${relayStudioID}`);
        },
        (error) => {
          console.log('error', error);
        }
      );
    };

    postRelayStudioData();

    // axios 성공하면 스튜디오 페이지로
  };

  return (
    <div className="modal--overlay">
      <div className="modal">
        <div className="modal__title">
          <SectionTitle title="방 생성하기" />
        </div>
        <form onSubmit={onSubmit} className="modal__form">
          <div className="modal__studio-title">
            <CardTitle title="방 제목" />
            <div className="modal__studio-title__input">
              <TextInput
                stroke
                label="제목을 입력해주세요"
                value={title}
                short
                onChange={onChangeTitle}
              />
            </div>
          </div>
          <div className="modal__studio-tag">
            <CardTitle title="장르" />
            <div className="modal__studio-tag__input">
              <TextInput
                stroke
                label="장르를 선택해주세요"
                value={inputValue}
                short
                onChange={onChangeGenre}
              />
            </div>
          </div>
          <div className="modal__up-down">
            <CardTitle title="인원 제한" />
            <UpDownInput aboutUser onSelect={onChangeLimitOfUsers} />
          </div>
          <div className="modal__up-down">
            <CardTitle title="편집 길이" />
            <UpDownInput onSelect={onChangeNumberOfBars} />
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
                label="방 생성"
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
