import type { IconName } from '$src/Iconice';

export type AbilityName = 'basicAttackFast' | 'basicAttackRegular' | 'basicAttackSlow' | 'block';
type AbilityTicks = 2 | 3 | 4;

export type Ability = {
  prettyName: string;
  ticks: AbilityTicks;
  icon: IconName;
};
