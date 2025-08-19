import type { CombatStats } from '$src/types/combatStats';

export type Combatant = {
  id: string;
  teamIndex?: number;
  race: string;
  name: string;
  combatStats: CombatStats;
  actions: any[];
};
