import React from 'react';
import './StudioCardDate.scss';

interface StudioCardDateProps {
  /**
   * 시작 날짜
   */
  startDate: Date;
  /**
   * 끝나는 날짜
   */
  endDate: Date;
}

const formatDate = (date: Date): string => {
  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  });

  const year = dateFormatter
    .formatToParts(date)
    .find((part) => part.type === 'year')?.value;
  const month = dateFormatter
    .formatToParts(date)
    .find((part) => part.type === 'month')?.value;
  const day = dateFormatter
    .formatToParts(date)
    .find((part) => part.type === 'day')?.value;

  return `${year}.${month}.${day}`;
};

const StudioCardDate = ({ startDate, endDate }: StudioCardDateProps) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <span className="studio__card--date">{`${formattedStartDate} ~ ${formattedEndDate}`}</span>
  );
};

export default StudioCardDate;
