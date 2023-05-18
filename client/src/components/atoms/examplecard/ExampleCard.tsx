import React from 'react';
import './ExampleCard.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import TextButton from '../buttons/TextButton';

interface ExampleCardProps {
  imgPath: string;
  header: string[];
  content: string[];
}

const ExampleCard = ({ imgPath, header, content }: ExampleCardProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/docs');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
      }}
    >
      <div className="example-card">
        <div>
          <img src={imgPath} alt="exampleImage" className="example-card__img" />
        </div>
        <div className="example-card__container">
          <div className="example-card__text-container">
            <div className="example-card__header">
              {header.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
            <div className="example-card__text">
              <div>
                {content.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="example-card__button">
            <TextButton blue label="서비스 알아보기" onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCard;
