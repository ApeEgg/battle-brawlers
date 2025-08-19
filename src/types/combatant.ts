import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';

export type Combatant = Character & {
  id: string;
  teamIndex?: number;
  combatStats: CombatStats;
};
