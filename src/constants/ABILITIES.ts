import type { Ability, AbilityName } from '$src/types/ability';

export default {
  basicAttackFast: {
    prettyName: '1h+1h',
    ticks: 1
  },
  basicAttackRegular: {
    prettyName: '1h+x',
    ticks: 2
  },
  basicAttackSlow: {
    prettyName: '2h',
    ticks: 3
  },
  block: {
    prettyName: 'block',
    ticks: 3
  }
} as Record<AbilityName, Ability>;
