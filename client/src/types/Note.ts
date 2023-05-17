interface Note {
  names: string | string[];
  duration: string;
  timing: number;
  instrumentType: 'melody' | 'beat';
}

interface relayNotes {
  relayStudioID: number;
  relayStudioSheet: string;
  complete: boolean;
}

export type { Note, relayNotes };
