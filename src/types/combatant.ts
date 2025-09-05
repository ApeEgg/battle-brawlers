import type { Character } from '$src/types/character';
import type { EnforcedCombatState } from '$src/types/combatStats';
import type { Ability, AbilityId } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

type StatusEffect = {
  ticks: number;
  value: number;
};

export type Combatant = Character & {
  id: string;
  teamIndex: number;
  animations: VFX[];
  injectedAnimations: VFX[];
  combatStats: EnforcedCombatState;
  eventTimestamp: number;
  eventAbility: AbilityId;
  eventIndex: number;
  abilities: Ability[];
  abilitiesCopied: Ability[];
  statuses: {
    isBlocking: boolean;
    knockedOut: number;
    isStunned: StatusEffect;
    isBleeding: StatusEffect;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
