import React, { useState, useEffect } from 'react';
import Footer from 'components/molecules/footer/Footer';
import Header from 'components/organisms/common/Header';
import { Outlet, useLocation } from 'react-router-dom';
import 'pages/MainLayout.scss';
import User from 'types/User';

const MainLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const [whiteMode, setWhiteMode] = useState(false);

  // localstorage에서 user 정보 가져오기
  const storedUser = localStorage.getItem('user');
  let user: User | null;
  if (storedUser) {
    user = JSON.parse(storedUser) as User;
  } else {
    user = null;
  }

  const fixedMode = isMainPage ? 'main__layout-header--fixed' : '';

  const handleScroll = () => {
    if (isMainPage) {
      const scrollPosition = window.pageYOffset;
      const viewportWidth = window.innerWidth;

      if (scrollPosition > 0.61 * viewportWidth) {
        setWhiteMode(false);
      } else {
        setWhiteMode(true);
      }
    } else {
      setWhiteMode(false);
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMainPage]);

  return (
    <div className="main__layout">
      <div className={['main__layout-header', fixedMode].join(' ')}>
        {user ? (
          <Header user={user} whiteMode={whiteMode} />
        ) : (
          <Header whiteMode={whiteMode} />
        )}
      </div>
      <div className="main__layout-body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
