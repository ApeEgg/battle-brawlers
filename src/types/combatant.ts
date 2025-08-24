import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';
import type { Ability, AbilityName } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

export type Combatant = Character & {
  id: string;
  teamIndex: number;
  animations: VFX[];
  injectedAnimations: VFX[];
  combatStats: CombatStats;
  eventTimestamp: number;
  eventAbility: AbilityName;
  eventIndex: number;
  abilitiesCopied: Ability[];
  statuses: {
    isBlocking: boolean;
    isStunned: boolean;
    knockedOut: number;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
