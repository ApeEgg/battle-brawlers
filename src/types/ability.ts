import type { IconName } from '$src/Iconice';
import type { VFX } from '$src/types/vfx';
import type { DynamicObject } from '$src/types/common';

export enum AbilityType {
  WindUp = 'windUp',
  WindDown = 'windDown',
  Channeling = 'channeling'
}

export type StatusEffect =
  | 'isBleeding'
  | 'isHealed'
  | 'isStunned'
  | 'isVulnerable'
  | 'isWounded'
  | 'isConcussed'
  | 'isExposed';

type AbilityTicks = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // 0 is for removal, see `prepareCombatant` in `generateCombat`

export type AbilityRef = {
  uuid?: string;
  id: string;
  overrides?: DynamicObject;
};

export type Ability = AbilityRef & {
  name: string;
  type: AbilityType;
  description: string;
  basic: boolean;
  ticks: AbilityTicks;
  chainLink?: number;
  chainTo?: number;
  start?: number;
  end?: number;
  icon: IconName;
  vfx: VFX;
  statusEffects: StatusEffect[];

  damage: number;
  healing: number;
  duration: number;
  damageModifier: number;
  healingModifier: number;
  durationModifier: number;
  calc?: {
    damage: any;
    healing: any;
    duration: any;
  };
};
