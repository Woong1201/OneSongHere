interface Note {
  names: string | string[];
  duration: string;
  timing: number;
  instrumentType: 'melody' | 'beat';
}

interface RelayNotes {
  relayStudioID: number;
  relayStudioSheet: string;
  complete: boolean;
}

export type { Note, RelayNotes };
