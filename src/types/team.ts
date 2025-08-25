import type { Combatant } from '$src/types/combatant';

export type Team = {
  name: string;
  index: number;
  combatants: Combatant[];
};
