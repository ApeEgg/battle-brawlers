import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';
import type { Ability } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

export type Combatant = Character & {
  id: string;
  teamIndex?: number;
  animations: VFX[];
  combatStats: CombatStats;
  nextAbilityTimestamp?: number;
  abilitiesCopied: Ability[];
  statuses: {
    isBlocking: boolean;
    knockedOut: number;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
