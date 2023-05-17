import type { Meta, StoryObj } from '@storybook/react';

import ModalForm from './ModalForm';

const meta = {
  title: 'organism/modal/ModalForm',
  component: ModalForm,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ModalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
