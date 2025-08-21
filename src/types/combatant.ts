import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';
import type { Ability } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

export type Combatant = Character & {
  id: string;
  teamIndex?: number;
  knockedOut: number;
  animations: VFX[];
  combatStats: CombatStats;
  nextAbilityTimestamp?: number;
  abilitiesCopied: Ability[];
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
