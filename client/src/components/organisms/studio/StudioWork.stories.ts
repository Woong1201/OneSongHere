import type { Meta, StoryObj } from '@storybook/react';

import StudioWork from './StudioWork';

const meta = {
  title: 'organism/Studio/StudioWork',
  component: StudioWork,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioWork>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    chordNotes: {
      // C Major
      C: {
        notes: ['C4', 'E4', 'G4'],
        name: 'C Major',
      },
      // G Major
      G: {
        notes: ['G4', 'B4', 'D5'],
        name: 'G Major',
      },
      // D Major
      D: {
        notes: ['D4', 'F#4', 'A4'],
        name: 'D Major',
      },
      // A Major
      A: {
        notes: ['A4', 'C#5', 'E5'],
        name: 'A Major',
      },
      // E Major
      E: {
        notes: ['E4', 'G#4', 'B4'],
        name: 'E Major',
      },
      // B Major
      B: {
        notes: ['B4', 'D#5', 'F#5'],
        name: 'B Major',
      },
      // A minor
      Am: {
        notes: ['A4', 'C5', 'E5'],
        name: 'A minor',
      },
      // E minor
      Em: {
        notes: ['E4', 'G4', 'B4'],
        name: 'E minor',
      },
      // B minor
      Bm: {
        notes: ['B4', 'D5', 'F#5'],
        name: 'B minor',
      },
      // F# minor
      'F#m': {
        notes: ['F#4', 'A4', 'C#5'],
        name: 'F# minor',
      },
      // C# minor
      'C#m': {
        notes: ['C#4', 'E4', 'G#4'],
        name: 'C# minor',
      },
      // G# minor
      'G#m': {
        notes: ['G#4', 'B4', 'D#5'],
        name: 'G# minor',
      },
    },
    notes: [],
  },
};
