import AlbumCard from 'components/molecules/albumcard/albumcard';
import { Button } from 'components/atoms/buttons/Button';
import SearchBar from 'components/molecules/searchsection/SearchBar';
import './Albums.scss';

export default function Albums() {
  return (
    <div className="album-container">
      <h1>명예의 전당</h1>
      {/* 생성날짜가 이번 달이고, 하트 개수가 가장 많은 앨범 세 개를 골라서 캐러셀으로 출력(자동전환) */}
      <div>
        <Button tag={false} label="일반" color="primary" shadow={false} />
        <Button tag={false} label="릴레이" color="other" shadow={false} />
      </div>
      <SearchBar label="곡 이름을 검색하세요" />
      <div>넣어주세요</div>
      <AlbumCard
        imgPath="https://hips.hearstapps.com/thepioneerwoman/wp-content/uploads/2013/03/ham3.jpg?crop=1xw:0.845763723150358xh;center,top"
        albumTitle="그슬린 햄"
        albumStudio="정육점"
        like={false}
        tag="컨트리"
        albumInfo="정육점에서 막 사온 햄을 바싹 구워먹는 상상을 담은 경쾌한 피아노 음색이 특징이다."
      />
      <AlbumCard
        imgPath="https://hips.hearstapps.com/thepioneerwoman/wp-content/uploads/2013/03/ham3.jpg?crop=1xw:0.845763723150358xh;center,top"
        albumTitle="그슬린 햄"
        albumStudio="정육점"
        like={false}
        tag="컨트리"
        albumInfo="정육점에서 막 사온 햄을 바싹 구워먹는 상상을 담은 경쾌한 피아노 음색이 특징이다."
      />
    </div>
  );
}
