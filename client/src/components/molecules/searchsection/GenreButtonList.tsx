import React, { useState } from 'react';
import './GenreButtonList.scss';
import { Button } from '../../atoms/buttons/Button';

// 장르 인터페이스 생성
interface Genre {
  name: string;
}

export const GenreButtonList = () => {
  // 전체 장르 리스트 만들기
  const genres: Genre[] = [
    { name: '컨트리' },
    { name: '힙합' },
    { name: '락' },
    { name: '클래식' },
    { name: '팝' },
    { name: '케이팝' },
  ];

  // 선택한 장르 배열
  const [select, setSelect] = useState<Array<string>>([]);

  // 리스트에 들어있지 않으면 넣어주고
  // 리스트에 들어있으면 제외한 배열을 반환한다.
  const handleClick = (type: string) => {
    if (!select.includes(type)) {
      setSelect([...select, type]);
    } else {
      setSelect(select.filter((genre) => genre !== type));
    }
  };

  // map() 메서드를 활용해서 장르를 하나씩 불러온다.
  // 불러온 장르가 선택된 것이면 색 스타일을'primary'로 하고 아니면 'other'로 한다.
  return (
    <div>
      {genres.map((genre) => (
        <Button
          key={genre.name}
          onClick={() => handleClick(genre.name)}
          type="button"
          tag
          label={genre.name}
          color={select.includes(genre.name) ? 'primary' : 'other'}
        />
      ))}
    </div>
  );
};
