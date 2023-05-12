import { Note } from 'types/Note';

interface RelayStudio {
  relayStudioID: number;
  relayStudioTitle: string;
  endDate: string;
  tags: Array<string>;
}

interface RelayStudioInfo {
  relayStudioID: number;
  relayStudioTitle: string;
  limitOfUsers: number;
  numberOfBars: number;
  relayStudioSheet: Note[];
  numberOfUsers: number;
  endDate: Date;
  status: number;
  userId: number;
  participate: boolean;
  vote: boolean;
  tags: string[];
}
export type { RelayStudio, RelayStudioInfo };
