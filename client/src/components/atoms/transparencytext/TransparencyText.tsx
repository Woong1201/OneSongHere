import React from 'react';
import './TransparencyText.scss';

interface TransparencyTextProps {
  // 텍스트 안에 비출 gif URL을 넣어주세요
  gifUrl: string;
  // 텍스트 내용을 적어주세요
  transparencyText: string;
}

function splitLines(str: string): [string, number][] {
  const lines = str.split('\r');
  return lines.map((line, index) => [line, index]);
}

const TransparencyText = ({
  gifUrl,
  transparencyText,
}: TransparencyTextProps) => {
  const ls = splitLines(transparencyText);

  return (
    <div className="transparency-box">
      <div
        className="transparency-text"
        style={{ backgroundImage: `url(${gifUrl})` }}
      >
        {ls.map(([line, index]) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default TransparencyText;
