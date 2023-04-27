import React from 'react';
import './CardTitle.scss';

interface CardTitleProps {
  /**
   * 스튜디오 카드, 작품 카드 등 중간 정도 섹션 타이틀
   */
  title: string;
}

const CardTitle = ({ title }: CardTitleProps) => {
  return <span className="card-title">{title}</span>;
};

export default CardTitle;
