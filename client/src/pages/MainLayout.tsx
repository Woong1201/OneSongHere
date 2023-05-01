import Footer from 'components/molecules/footer/Footer';
import Header from 'components/organisms/common/Header';
import { Outlet, useLocation } from 'react-router-dom';
import 'pages/MainLayout.scss';

const MainLayout = () => {
  const location = useLocation();

  const isMainPage = location.pathname === '/';
  return (
    <div className="main__layout">
      <div className="main__layout-header">
        <Header whiteMode={isMainPage} />
      </div>
      <div className="main__layout-body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
