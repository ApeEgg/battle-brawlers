import type { Ability, AbilityName } from '$src/types/ability';
import VFX from '$src/constants/VFX';

export default {
  basicAttackFast: () => ({
    id: crypto.randomUUID(),
    abilityName: 'basicAttackFast',
    prettyName: 'Basic attack',
    description: 'Basic one-handed dual-wield attack.',
    ticks: 2,
    icon: '1h1h',
    vfx: VFX.basicAttackFast
  }), // 8 (80% of 10)
  basicAttackRegular: () => ({
    id: crypto.randomUUID(),
    abilityName: 'basicAttackRegular',
    prettyName: 'Basic attack',
    description: 'Basic one-handed attack.',
    ticks: 3,
    icon: '1h',
    vfx: VFX.basicAttackRegular
  }), // 10
  basicAttackSlow: () => ({
    id: crypto.randomUUID(),
    abilityName: 'basicAttackSlow',
    prettyName: 'Basic attack',
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '2h',
    vfx: VFX.basicAttackSlow
  }), // 16 (160% of 10)
  block: () => ({
    id: crypto.randomUUID(),
    abilityName: 'block',
    prettyName: 'Shield block',
    description: 'Raise your shield to block. Prevent all damage during the duration.',
    ticks: 3,
    icon: 'block',
    vfx: VFX.block
  }),
  stun: () => ({
    id: crypto.randomUUID(),
    abilityName: 'stun',
    prettyName: 'Stun',
    description: 'Stun your opponent for the duration of their current ability.',
    ticks: 1,
    icon: 'stun',
    vfx: VFX.stun
  })
} as Record<AbilityName, () => Ability>;
