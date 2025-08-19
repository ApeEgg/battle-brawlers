import type { Team } from '$src/types/team';

type Event = {
  timestamp: number;
  eventTaker: any;
  target: any;
  teams: Team[];
  log: {
    damage: {
      result: number;
    };
  };
};

export type Combat = {
  // start: number;
  // seed: string;
  teams: Team[];
  events: Event[];
};
