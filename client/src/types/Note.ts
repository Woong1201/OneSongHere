interface Note {
  names: string | string[];
  duration: string;
  timing: number;
}

interface relayNotes {
  relayStudioID: number;
  relayStudioSheet: string;
  complete: boolean;
}

export type { Note, relayNotes };
