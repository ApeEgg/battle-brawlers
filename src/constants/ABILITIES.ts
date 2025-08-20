import type { Ability, AbilityName } from '$src/types/ability';

export default {
  basicAttackFast: {
    abilityName: 'basicAttackFast',
    prettyName: '1h+1h',
    ticks: 2,
    icon: '1h1h',
    animation: {
      duration: 500
    }
  },
  basicAttackRegular: {
    abilityName: 'basicAttackRegular',
    prettyName: '1h+x',
    ticks: 2,
    icon: '1h',
    animation: {
      duration: 500
    }
  },
  basicAttackSlow: {
    abilityName: 'basicAttackSlow',
    prettyName: '2h',
    ticks: 3,
    icon: '2h',
    animation: {
      duration: 500
    }
  },
  block: {
    abilityName: 'block',
    prettyName: 'block',
    ticks: 3,
    icon: 'logo-apeegg',
    animation: {
      duration: 500
    }
  }
} as Record<AbilityName, Ability>;
