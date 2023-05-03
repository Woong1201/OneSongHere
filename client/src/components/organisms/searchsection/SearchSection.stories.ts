import type { Meta, StoryObj } from '@storybook/react';

import SearchSection from 'components/organisms/searchsection/SearchSection';

const meta = {
  title: 'organism/SearchSection/SearchSection',
  component: SearchSection,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof SearchSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
