import React from 'react';
import './SectionTitle.scss';

interface SectionTitleProps {
  /**
   * 페이지 타이틀 등 상위 타이틀
   */
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <span className="section-title">{title}</span>;
};

export default SectionTitle;
