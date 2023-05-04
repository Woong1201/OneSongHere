import { TextInput } from 'components/atoms/inputs/TextInput';
import React, { PropsWithChildren, useState } from 'react';
import { Button } from 'components/atoms/buttons/Button';
import './ModalForm.scss';

interface ModalProps {
  onClickModal: () => void;
}

const Modal = ({ onClickModal, children }: PropsWithChildren<ModalProps>) => {
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // axios 성공하면 스튜디오 페이지로
  };

  return (
    <div className="modal">
      <h2>방 생성하기</h2>
      <br />
      <form onSubmit={onSubmit}>
        <div>
          <h4>방 제목</h4>
          <TextInput
            stroke
            label="제목을 입력해주세요"
            value={title}
            onChange={onChangeTitle}
          />
          <h4>태그 / 장르</h4>
          <TextInput
            stroke
            label="장르를 선택해주세요"
            value={genre}
            onChange={onChangeGenre}
          />
        </div>
        <br />
        <div className="modal__buttons">
          <Button type="button" label="취소" />
          <Button type="submit" label="방 생성" color="primary" />
        </div>
      </form>
    </div>
  );
};

export default Modal;
