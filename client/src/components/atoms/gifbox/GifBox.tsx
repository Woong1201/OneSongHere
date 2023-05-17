import React from 'react';
import './GifBox.scss';

interface GifBoxProps {
  gifPath: string;
  texts: string[];
  color: string;
}

const GifBox = ({ gifPath, texts, color }: GifBoxProps) => {
  return (
    <div style={{ backgroundColor: `${color}` }} className="gifBox">
      {texts.map((line) => (
        <div key={line} className="gifBox__font">
          {line}
          <br />
        </div>
      ))}
      <br />
      <img src={gifPath} alt="gif" className="gifBox__img" />
    </div>
  );
};

export default GifBox;
