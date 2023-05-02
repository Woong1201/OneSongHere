import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

const meta = {
  title: 'atom/Input/Text',
  component: TextInput,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: '',
    value: '',
  },
};

// export const Secondary: Story = {
//   args: {
//     tag: false,
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     color: 'primary',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     color: 'other',
//     label: 'Button',
//   },
// };
