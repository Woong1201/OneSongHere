import React from 'react';
import 'components/atoms/buttons/TextButton.scss';
import { Link } from 'react-router-dom';

interface TextButtonProps {
  /**
   * 라벨
   */
  label: string;
  /**
   * 라우터 경로로 사용할 시 경로 입력
   */
  to?: string;
  /**
   * 다른 이벤트 발생시키려면 이벤트 입력
   */
  onClick?: () => void;
  /**
   * 글씨 하얀색으로
   */
  white?: boolean;
}

const TextButton = ({
  label = '텍스트버튼',
  to,
  onClick,
  white = false,
}: TextButtonProps) => {
  // white가 true로 들어온다면 text-button--white 속성이 추가되도록 colorMode 설정
  const colorMode = white ? 'text-button--white' : null;

  // to로 파라미터가 들어온다면 라우터 링크 텍스트 버튼으로 if문
  if (to) {
    return (
      // 그런 경우 링크 태그를 이용
      <Link
        to={to}
        onClick={onClick}
        className={['text-button', colorMode].join(' ')}
      >
        {label}
      </Link>
    );
  }
  // to가 안들어오면 그냥 버튼
  return (
    <button
      type="button"
      onClick={onClick}
      className={['text-button', colorMode].join(' ')}
    >
      {label}
    </button>
  );
};

export default TextButton;
