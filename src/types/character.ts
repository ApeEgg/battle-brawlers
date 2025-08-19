import type { Action } from '$src/types/action';
import type { CombatStats } from '$src/types/combatStats';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf';

export type Character = {
  name: string;
  race: Race;
  actions: Action[];
  combatStats?: CombatStats;
};
