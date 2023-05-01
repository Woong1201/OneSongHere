import React, { useState } from 'react';
import './LikeHeart.scss';
import HeartImgEmpty from 'assets/images/like_heart_empty.png';
import HeartImg from 'assets/images/like_heart.png';

interface LikeProps {
  /**
   * 좋아요 버튼이 클릭되어져 있는지를 넣어주세요
   */
  isPushed: boolean;
}

const LikeHeart = ({ isPushed }: LikeProps) => {
  // useState로 push의 값(boolean)을 바꿔주는 setPush 정의
  const [push, setPush] = useState<boolean>(isPushed);

  // 클릭 시, push의 값을 역전해준다.
  const handleClick = (): void => {
    setPush(!push);
  };

  return (
    <div>
      <button type="button" onClick={handleClick} className="like-button">
        {/* push 값에 따라 다른 이미지 출력 */}
        <img src={push ? HeartImg : HeartImgEmpty} alt="img not found" />
      </button>
    </div>
  );
};

export default LikeHeart;
