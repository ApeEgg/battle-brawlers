import type { Team } from '$src/types/team';
import type { Combatant } from '$src/types/combatant';

export type CombatEvent = {
  eventTimestamp: number;
  globalEventIndex: number;
  eventIndex: number;
  eventTaker: Combatant;
  target: Combatant;
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
  events: CombatEvent[];
  duration: number;
};
