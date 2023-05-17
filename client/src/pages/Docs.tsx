import Intro from 'components/atoms/guide/Intro';
import './Docs.scss';
import MenuBar from 'components/molecules/guidemenu/MenuBar';
import { useEffect, useRef, useState } from 'react';
import ComposePage from 'components/atoms/guide/ComposePage';
import StudioPage from 'components/atoms/guide/StudioPage';
import AlbumPage from 'components/atoms/guide/AlbumPage';
import CommunityPage from 'components/atoms/guide/CommunityPage';

const Docs = () => {
  const [menu, setMenu] = useState<number>(0);
  const introRef = useRef<HTMLDivElement | null>(null);
  const composePageRef = useRef<HTMLDivElement | null>(null);
  const studioPageRef = useRef<HTMLDivElement | null>(null);
  const albumPageRef = useRef<HTMLDivElement | null>(null);
  const communityPageRef = useRef<HTMLDivElement | null>(null);

  const handleMenu = (value: number) => {
    setMenu(value);
  };

  useEffect(() => {
    switch (menu) {
      case 0:
        (introRef.current as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 1:
        (composePageRef.current as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 2:
        (studioPageRef.current as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 3:
        (albumPageRef.current as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 4:
        (communityPageRef.current as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
        break;
      default:
        break;
    }
  }, [menu]);

  return (
    <div className="docs">
      <div className="docs__container">
        <MenuBar onMenuClick={handleMenu} menu={menu} />
        <div className="docs__content" ref={introRef}>
          <Intro />
        </div>
        <div className="docs__content" ref={composePageRef}>
          <ComposePage />
        </div>
        <div className="docs__content" ref={studioPageRef}>
          <StudioPage />
        </div>
        <div className="docs__content" ref={albumPageRef}>
          <AlbumPage />
        </div>
        <div className="docs__content" ref={communityPageRef}>
          <CommunityPage />
        </div>
      </div>
    </div>
  );
};
export default Docs;
