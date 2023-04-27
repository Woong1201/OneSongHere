import React from 'react';
import { ReactComponent as PurpleRecordSvg } from 'assets/images/record/record_purple.svg';
import { ReactComponent as BlackRecordSvg } from 'assets/images/record/record_black.svg';

enum Color {
  Purple = 'purple',
  Black = 'black',
}

interface RecordImageProps {
  /**
   * 레코드판 색깔
   */
  color?: Color;
}

const RecordImage = ({ color = Color.Purple }: RecordImageProps) => {
  let SelectedRecord: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  switch (color) {
    case Color.Purple:
      SelectedRecord = PurpleRecordSvg;
      break;
    case Color.Black:
      SelectedRecord = BlackRecordSvg;
      break;
    default:
      SelectedRecord = PurpleRecordSvg;
  }

  return (
    <div>
      <SelectedRecord />
    </div>
  );
};

export default RecordImage;
