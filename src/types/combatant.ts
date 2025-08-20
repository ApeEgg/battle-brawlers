import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';
import type { Ability } from '$src/types/ability';

export type Combatant = Character & {
  id: string;
  teamIndex?: number;
  knockedOut: number;
  animations: Ability[];
  combatStats: CombatStats;
  nextEvent?: number;
};
