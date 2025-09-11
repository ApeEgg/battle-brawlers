import type { Character } from '$src/types/character';
import type { CombatStats } from '$src/types/combatStats';
import type { Ability } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';

type StatusStack = {
  max: number;
  value: number;
};

type StatusEffect = {
  ticks: number;
  value: number;
};

export type Combatant = Character & {
  id: string;
  teamIndex: number;
  animations: VFX[];
  injectedAnimations: VFX[];
  combatStats: Required<CombatStats>;
  eventTimestamp: number;
  abilities: Required<Ability>[];
  abilitiesCopied: Required<Ability>[];
  damage: number;
  statuses: {
    isBlocking: boolean;
    knockedOut: number;
    isStunned: StatusEffect;
    isBleeding: StatusEffect;
    isVulnerable: StatusEffect;

    isWounded: StatusStack;
    isConcussed: StatusStack;
    isExposed: StatusStack;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
