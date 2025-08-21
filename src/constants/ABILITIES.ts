import type { Ability, AbilityName } from '$src/types/ability';
import VFX from '$src/constants/VFX';

export default {
  basicAttackFast: {
    abilityName: 'basicAttackFast',
    prettyName: '1h+1h',
    ticks: 1,
    icon: '1h1h',
    vfx: VFX.basicAttackFast
  },
  basicAttackRegular: {
    abilityName: 'basicAttackRegular',
    prettyName: '1h+x',
    ticks: 2,
    icon: '1h',
    vfx: VFX.basicAttackRegular
  },
  basicAttackSlow: {
    abilityName: 'basicAttackSlow',
    prettyName: '2h',
    ticks: 3,
    icon: '2h',
    vfx: VFX.basicAttackSlow
  },
  block: {
    abilityName: 'block',
    prettyName: 'block',
    ticks: 3,
    icon: 'block',
    vfx: VFX.block
  },
  stun: {
    abilityName: 'stun',
    prettyName: 'stun',
    ticks: 1,
    icon: 'stun',
    vfx: VFX.stun
  }
} as Record<AbilityName, Ability>;
