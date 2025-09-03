import type { AbilityRef } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';
import type { CharacterEquipment } from '$src/types/equipment';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf' | 'goblin';

export type Character = {
  id: string;
  name: string;
  description: string;
  race: Race;
  size: number;
  equipment: CharacterEquipment;
  abilities: AbilityRef[];
  maxTicks: number;
  combatStats?: CombatStats;
};
