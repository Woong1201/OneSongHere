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
  const colorMode = white ? 'text-button--white' : null;

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={['text-button', colorMode].join(' ')}
      >
        {label}
      </Link>
    );
  }
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
