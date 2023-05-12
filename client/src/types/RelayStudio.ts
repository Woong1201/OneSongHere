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
  /**
   * status
   * 1 : 구인중 - 누군가 제출하고 다음사람 못찾음
   * 2 : 참여 - 작곡중 이때 userId는 작곡중인 사람
   * 3 : 투표 - userId는 아직 작곡중인 사람, 페이지 입장
   * 4 : 완료 - 1,2,3 반복하다가 모든 사람 다 완료하고 그러면 userId는 방장이고 이사람만 저장 가능 나머지는 듣기만 가능(참여했던 사람들)
   */
  status: number;
  userId: number;
  participate: boolean;
  vote: boolean;
  tags: string[];
}
export type { RelayStudio, RelayStudioInfo };
