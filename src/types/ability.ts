import type { IconName } from '$src/Iconice';
import type { VFX } from '$src/types/vfx';

export type AbilityName =
  | 'basicAttackFast'
  | 'basicAttackRegular'
  | 'basicAttackSlow'
  | 'block'
  | 'stun';

type AbilityTicks = 0 | 1 | 2 | 3 | 4; // 0 is for removal, see `prepareCombatant` in `generateCombat`

export type Ability = {
  abilityName: AbilityName;
  prettyName: string;
  ticks: AbilityTicks;
  icon: IconName;
  vfx: VFX;
};
