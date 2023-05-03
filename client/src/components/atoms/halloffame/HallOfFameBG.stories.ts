import type { Meta, StoryObj } from '@storybook/react';

import HallOfFameBG from 'components/atoms/halloffame/HallOfFameBG';

const meta = {
  title: 'atom/HallOfFame/HallOfFameBG',
  component: HallOfFameBG,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof HallOfFameBG>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgPath:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2018%2F02%2F13%2Ffield-image-ham-slices-hero-2000.jpg&q=60',
    albumTitle: 'ㅇ',
    albumStudio: 'ㅇ',
  },
};
