import TextInput from 'components/atoms/inputs/TextInput';
import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/buttons/Button';
import './ModalForm.scss';
import SectionTitle from 'components/atoms/common/SectionTitle';
import CardTitle from 'components/atoms/common/CardTitle';
import { postRelayStudio } from 'services/studio';
import { useNavigate } from 'react-router-dom';

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

  const onChangeLimitOfUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(event.target.value, 10);
    setLimitOfUsers(numValue);
  };
  const onChangenumberOfBars = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(event.target.value, 10);
    setNumberOfBars(numValue);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
            <br />
            <TextInput
              stroke
              label="제목을 입력해주세요"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="modal__studio-tag">
            <CardTitle title="태그 / 장르" />
            <br />
            <TextInput
              stroke
              label="장르를 선택해주세요"
              value={inputValue}
              onChange={onChangeGenre}
            />
          </div>
          <div className="modal__studio-tag">
            <CardTitle title="인원 제한" />
            <br />
            <TextInput
              stroke
              label="장르를 선택해주세요"
              value={limitOfUsers}
              onChange={onChangeLimitOfUsers}
            />
          </div>
          <div className="modal__studio-tag">
            <CardTitle title="편집 길이" />
            <br />
            <TextInput
              stroke
              label="장르를 선택해주세요"
              value={numberOfBars}
              onChange={onChangenumberOfBars}
            />
          </div>
          <div className="modal__buttons">
            <Button type="button" label="취소" onClick={onClickModal} />
            <br className="modal__buttons--blank" />
            <Button type="submit" label="방 생성" color="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
