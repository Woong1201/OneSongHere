import React from 'react';
import './Footer.scss';
import Logo from '../common/Logo';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer--logo">
        <Logo whiteMode />
      </div>
      <hr />
      <div className="footer--info">
        <p>
          대표자: 김영웅 | 개인정보보호책임자: 임두현 | 이메일:
          variety82p@gmail.com
        </p>
        <p>주소: 서울특별시 강남구 역삼동 테헤란로 212 17층 1701호</p>
        <p>Copyright ©A808 All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
