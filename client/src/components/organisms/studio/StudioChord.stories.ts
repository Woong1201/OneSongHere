import type { Meta, StoryObj } from '@storybook/react';

import StudioChord from './StudioChord';

const meta = {
  title: 'organism/Studio/StudioChord',
  component: StudioChord,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    chordNotes: {
      // C Major
      C: {
        names: ['C4', 'E4', 'G4'],
        duration: '4n',
        timing: 0,
        instrumentType: 'melody',
      },
      // G Major
      G: {
        names: ['G4', 'B4', 'D5'],
        duration: '4n',
        timing: 1,
        instrumentType: 'melody',
      },
      // D Major
      D: {
        names: ['D4', 'F#4', 'A4'],
        duration: '4n',
        timing: 2,
        instrumentType: 'melody',
      },
      // A Major
      A: {
        names: ['A4', 'C#5', 'E5'],
        duration: '4n',
        timing: 3,
        instrumentType: 'melody',
      },
      // E Major
      E: {
        names: ['E4', 'G#4', 'B4'],
        duration: '4n',
        timing: 4,
        instrumentType: 'melody',
      },
      // B Major
      B: {
        names: ['B4', 'D#5', 'F#5'],
        duration: '4n',
        timing: 5,
        instrumentType: 'melody',
      },
      // A minor
      Am: {
        names: ['A4', 'C5', 'E5'],
        duration: '4n',
        timing: 6,
        instrumentType: 'melody',
      },
      // E minor
      Em: {
        names: ['E4', 'G4', 'B4'],
        duration: '4n',
        timing: 7,
        instrumentType: 'melody',
      },
      // B minor
      Bm: {
        names: ['B4', 'D5', 'F#5'],
        duration: '4n',
        timing: 8,
        instrumentType: 'melody',
      },
      // F# minor
      'F#m': {
        names: ['F#4', 'A4', 'C#5'],
        duration: '4n',
        timing: 9,
        instrumentType: 'melody',
      },
      // C# minor
      'C#m': {
        names: ['C#4', 'E4', 'G#4'],
        duration: '4n',
        timing: 10,
        instrumentType: 'melody',
      },
      // G# minor
      'G#m': {
        names: ['G#4', 'B4', 'D#5'],
        duration: '4n',
        timing: 11,
        instrumentType: 'melody',
      },
    },
  },
};
