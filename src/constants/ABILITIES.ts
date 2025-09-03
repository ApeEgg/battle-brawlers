import { AbilityType } from '$src/types/ability';
import VFX from '$src/constants/VFX';

export default {
  basicAttackFast: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 2,
    icon: '1h',
    vfx: VFX.basicAttackFast
  }, // 8 (80% of 10)
  basicAttackRegular: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 3,
    icon: '1h',
    vfx: VFX.basicAttackRegular
  }, // 10
  basicAttackSlow: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '1h',
    vfx: VFX.basicAttackSlow
  }, // 16 (160% of 10)
  block: {
    prettyName: 'Shield block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 4,
    icon: 'block',
    vfx: VFX.block
  },
  stun: {
    prettyName: 'Stun',
    type: AbilityType.WindUp,
    description: 'Stun your opponent for the duration of their current ability.',
    ticks: 1,
    icon: 'stun',
    vfx: VFX.stun
  },
  spin: {
    prettyName: 'Spin',
    type: AbilityType.Channeling,
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'spin',
    vfx: VFX.spin
  },
  lacerate: {
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Add a bleed to your opponent.',
    ticks: 2,
    icon: '1h1h',
    vfx: VFX.basicAttackFast
  }
};
