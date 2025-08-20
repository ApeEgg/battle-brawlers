import type { Ability, AbilityName } from '$src/types/ability';

export default {
  basicAttackFast: {
    prettyName: '1h+1h',
    ticks: 2,
    icon: '1h1h'
  },
  basicAttackRegular: {
    prettyName: '1h+x',
    ticks: 2,
    icon: '1h'
  },
  basicAttackSlow: {
    prettyName: '2h',
    ticks: 3,
    icon: '2h'
  },
  block: {
    prettyName: 'block',
    ticks: 3,
    icon: 'logo-apeegg'
  }
} as Record<AbilityName, Ability>;
