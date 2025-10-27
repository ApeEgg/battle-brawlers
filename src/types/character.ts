import type { CharacterKey } from '$src/constants/CHARACTERS';
import type { AbilityRef } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';
import type { CharacterEquipment } from '$src/types/equipment';
// import type { DynamicObject } from '$src/types/common';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf' | 'goblin';

export type CharacterRef = {
  uuid?: string;
  id: string;
  overrides: {
    abilities: AbilityRef[];
    equipment: CharacterEquipment;
    combatStats: CombatStats;
  };
};

export type Character = CharacterRef & {
  name: string;
  description: string;
  race: CharacterKey;
  image: string;
  size: number;
  equipment: CharacterEquipment;
  abilities: AbilityRef[];
  maxTicks: number;
  element: string;
  combatStats?: Required<CombatStats>;
};
