import type { IconName } from '$src/Iconice';
import type { VFX } from '$src/types/vfx';

export type AbilityId =
  | 'basicAttackFast'
  | 'basicAttackRegular'
  | 'basicAttackSlow'
  | 'block'
  | 'stun'
  | 'spin'
  | 'lacerate';

export enum AbilityType {
  WindUp = 'windUp',
  WindDown = 'windDown',
  Channeling = 'channeling'
}

type AbilityTicks = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // 0 is for removal, see `prepareCombatant` in `generateCombat`

export type Ability = {
  guid: string;
  id: AbilityId;
  prettyName: string;
  type: AbilityType;
  description: string;
  ticks: AbilityTicks;
  chainLink?: number;
  chainTo?: number;
  start?: number;
  end?: number;
  icon: IconName;
  vfx: VFX;
};
