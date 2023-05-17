import Intro from 'components/atoms/guide/Intro';
import './Docs.scss';
import MenuBar from 'components/molecules/guidemenu/MenuBar';
import { useState } from 'react';

const Docs = () => {
  const [menu, setMenu] = useState<number>(0);

  const handleMenu = (value: number) => {
    setMenu(value);
  };

  const handleContent = () => {
    if (menu === 0) {
      return <Intro />;
    }
    return <div>하핳</div>;
  };

  return (
    <div className="docs">
      <div className="docs__container">
        <MenuBar onMenuClick={handleMenu} menu={menu} />
        {handleContent()}
      </div>
    </div>
  );
};
export default Docs;
