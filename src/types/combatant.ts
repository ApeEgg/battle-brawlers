import type { Character } from '$src/types/character';
import type { EnforcedCombatState } from '$src/types/combatStats';
import type { Ability, AbilityId } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

export type Combatant = Character & {
  id: string;
  teamIndex: number;
  animations: VFX[];
  injectedAnimations: VFX[];
  combatStats: EnforcedCombatState;
  eventTimestamp: number;
  eventAbility: AbilityId;
  eventIndex: number;
  abilitiesCopied: Ability[];
  statuses: {
    isBlocking: boolean;
    isStunned: boolean;
    knockedOut: number;
    isBleeding: boolean;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
