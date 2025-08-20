export type AbilityName = 'basicAttackFast' | 'basicAttackRegular' | 'basicAttackSlow' | 'block';
type AbilityTicks = 1 | 2 | 3 | 4;

export type Ability = {
  prettyName: string;
  ticks: AbilityTicks;
};
