import type { Ability, AbilityName } from '$src/types/ability';
import VFX from '$src/constants/VFX';

export default {
  basicAttackFast: {
    abilityName: 'basicAttackFast',
    prettyName: '1h+1h',
    ticks: 2,
    icon: '1h1h',
    vfx: VFX.basicAttackFast
  }, // 8 (80% of 10)
  basicAttackRegular: {
    abilityName: 'basicAttackRegular',
    prettyName: '1h+x',
    ticks: 3,
    icon: '1h',
    vfx: VFX.basicAttackRegular
  }, // 10
  basicAttackSlow: {
    abilityName: 'basicAttackSlow',
    prettyName: '2h',
    ticks: 4,
    icon: '2h',
    vfx: VFX.basicAttackSlow
  }, // 16 (160% of 10)
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
