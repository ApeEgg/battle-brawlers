import type { Combatant } from '$src/types/combatant';

export type Team = {
  index: number;
  name: string;
  combatants: Combatant[];
};
