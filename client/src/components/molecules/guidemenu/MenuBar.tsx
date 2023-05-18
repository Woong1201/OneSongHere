import './MenuBar.scss';

interface MenuBarProps {
  menu: number;
  onMenuClick: (value: number) => void;
}
const MenuBar = ({ menu, onMenuClick }: MenuBarProps) => {
  return (
    <div className="menu__list">
      <p
        className={`menu__item${menu === 0 ? '--active' : ''}`}
        onClick={() => onMenuClick(0)}
        role="presentation"
      >
        서비스 소개
      </p>
      {/* <hr /> */}
      <p
        className={`menu__item${menu === 1 ? '--active' : ''}`}
        onClick={() => onMenuClick(1)}
        role="presentation"
      >
        작곡
      </p>
      {/* <hr /> */}
      <p
        className={`menu__item${menu === 2 ? '--active' : ''}`}
        onClick={() => onMenuClick(2)}
        role="presentation"
      >
        스튜디오
      </p>
      {/* <hr /> */}
      <p
        className={`menu__item${menu === 3 ? '--active' : ''}`}
        onClick={() => onMenuClick(3)}
        role="presentation"
      >
        작품
      </p>
      {/* <hr /> */}
      <p
        className={`menu__item${menu === 4 ? '--active' : ''}`}
        onClick={() => onMenuClick(4)}
        role="presentation"
      >
        커뮤니티
      </p>
      {/* <hr /> */}
    </div>
  );
};
export default MenuBar;
