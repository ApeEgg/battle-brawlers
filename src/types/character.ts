import type { Ability } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf';

export type Character = {
  name: string;
  race: Race;
  size: number;
  abilities: Ability[];
  combatStats?: CombatStats;
};
