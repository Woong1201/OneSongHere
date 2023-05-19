import Intro from 'components/atoms/guide/Intro';
import './Docs.scss';
import MenuBar from 'components/molecules/guidemenu/MenuBar';
import { useEffect, useRef, useState } from 'react';
import ComposePage from 'components/atoms/guide/ComposePage';
import StudioPage from 'components/atoms/guide/StudioPage';
import AlbumPage from 'components/atoms/guide/AlbumPage';
import CommunityPage from 'components/atoms/guide/CommunityPage';

interface Section {
  ref: React.RefObject<HTMLDivElement>;
  offsetTop: number;
}

const Docs = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections: Section[] = [
    { ref: useRef<HTMLDivElement>(null), offsetTop: 0 },
    { ref: useRef<HTMLDivElement>(null), offsetTop: 0 },
    { ref: useRef<HTMLDivElement>(null), offsetTop: 0 },
    { ref: useRef<HTMLDivElement>(null), offsetTop: 0 },
    { ref: useRef<HTMLDivElement>(null), offsetTop: 0 },
  ];

  const handleMenuClick = (index: number) => {
    setIsScrolling(true);
    sections[index].ref.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveMenu(index);
    setTimeout(() => setIsScrolling(false), 1800);
  };

  useEffect(() => {
    const updatedSections = sections.map((section) => {
      const newSection = { ...section };
      if (newSection.ref.current) {
        newSection.offsetTop = newSection.ref.current.offsetTop;
        // newSection.offsetHeight = newSection.ref.current.offsetHeight;
      }
      return newSection;
    });

    const onScroll = () => {
      if (isScrolling) return;

      let currentMenu = activeMenu;
      for (let i = 0; i < updatedSections.length; i += 1) {
        const { offsetTop } = updatedSections[i];
        if (window.pageYOffset >= offsetTop) {
          currentMenu = i;
        }
      }
      if (currentMenu !== activeMenu) {
        setActiveMenu(currentMenu);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeMenu, sections, isScrolling]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [scrollNumber, setScrollNumber] = useState(0);
  const handleScroll = () => {
    setScrollNumber(window.innerHeight + window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="docs">
      <div className="docs__container">
        <MenuBar menu={activeMenu} onMenuClick={handleMenuClick} />
        <div className="docs__content" ref={sections[0].ref}>
          <Intro />
        </div>
        <div className="docs__content" ref={sections[1].ref}>
          <ComposePage />
        </div>
        <div className="docs__content" ref={sections[2].ref}>
          <StudioPage />
        </div>
        <div className="docs__content" ref={sections[3].ref}>
          <AlbumPage />
        </div>
        <div className="docs__content" ref={sections[4].ref}>
          <CommunityPage />
        </div>
      </div>
      {scrollNumber > 1077 ? (
        <button
          type="button"
          className="launch__button"
          onClick={goToTop}
          style={{ cursor: 'pointer' }}
        >
          ▲
        </button>
      ) : null}
    </div>
  );
};
export default Docs;
