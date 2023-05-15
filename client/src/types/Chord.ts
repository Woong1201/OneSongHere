type ChordValue = {
  notes: string[];
  name: string;
};

type Chord =
  | 'C'
  | 'G'
  | 'D'
  | 'A'
  | 'E'
  | 'B'
  | 'Am'
  | 'Em'
  | 'Bm'
  | 'F#m'
  | 'C#m'
  | 'G#m';

export type { Chord, ChordValue };
