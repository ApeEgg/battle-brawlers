import { AbilityType, type Ability, type AbilityId } from '$src/types/ability';
import VFX from '$src/constants/VFX';

export default {
  basicAttackFast: () => ({
    guid: crypto.randomUUID(),
    id: 'basicAttackFast',
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 2,
    icon: '1h',
    vfx: VFX.basicAttackFast
  }), // 8 (80% of 10)
  basicAttackRegular: () => ({
    guid: crypto.randomUUID(),
    id: 'basicAttackRegular',
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 3,
    icon: '1h',
    vfx: VFX.basicAttackRegular
  }), // 10
  basicAttackSlow: () => ({
    guid: crypto.randomUUID(),
    id: 'basicAttackSlow',
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '1h',
    vfx: VFX.basicAttackSlow
  }), // 16 (160% of 10)
  block: () => ({
    guid: crypto.randomUUID(),
    id: 'block',
    prettyName: 'Shield block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 4,
    icon: 'block',
    vfx: VFX.block
  }),
  stun: () => ({
    guid: crypto.randomUUID(),
    id: 'stun',
    prettyName: 'Stun',
    type: AbilityType.WindUp,
    description: 'Stun your opponent for the duration of their current ability.',
    ticks: 1,
    icon: 'stun',
    vfx: VFX.stun
  }),
  spin: () => ({
    guid: crypto.randomUUID(),
    id: 'spin',
    prettyName: 'Spin',
    type: AbilityType.Channeling,
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'spin',
    vfx: VFX.spin
  }),
  lacerate: () => ({
    guid: crypto.randomUUID(),
    id: 'lacerate',
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Add a bleed to your opponent.',
    ticks: 2,
    icon: '1h1h',
    vfx: VFX.basicAttackFast
  })
} as Record<AbilityId, () => Ability>;
