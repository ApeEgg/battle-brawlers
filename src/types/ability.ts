import type { IconName } from '$src/Iconice';
import type { VFX } from '$src/types/vfx';
import type { DynamicObject } from '$src/types/common';

export type AbilityId =
  | 'basicAttackFast'
  | 'basicAttackRegular'
  | 'basicAttackSlow'
  | 'block'
  | 'stun'
  | 'whirlwind'
  | 'lacerate';

export enum AbilityType {
  WindUp = 'windUp',
  WindDown = 'windDown',
  Channeling = 'channeling'
}

type AbilityTicks = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // 0 is for removal, see `prepareCombatant` in `generateCombat`

export type AbilityRef = {
  uuid?: string;
  id: string;
  overrides?: DynamicObject;
};

export type Ability = AbilityRef & {
  prettyName: string;
  type: AbilityType;
  description: string;
  basic: boolean;
  ticks: AbilityTicks;
  damageCalc?: any;
  damage: number;
  chainLink?: number;
  chainTo?: number;
  start?: number;
  end?: number;
  icon: IconName;
  vfx: VFX;
};
