import type { Ability } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf' | 'goblin';

export type Character = {
  id: string;
  name: string;
  race: Race;
  size: number;
  abilities: Ability[];
  combatStats?: CombatStats;
};
