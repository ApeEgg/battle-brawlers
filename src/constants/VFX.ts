import type { VFX } from '$src/types/vfx';

export default {
  basicAttackFast: {
    vfxName: 'basicAttackFast',
    duration: 1000
  },
  basicAttackRegular: {
    vfxName: 'basicAttackRegular',
    duration: 1500
  },
  basicAttackSlow: {
    vfxName: 'basicAttackSlow',
    duration: 2000
  },
  block: {
    vfxName: 'block',
    duration: 2000 + 250 // lingering time
  },
  kick: {
    vfxName: 'kick',
    duration: 500
  },
  whirlwind: {
    vfxName: 'whirlwind',
    duration: 500
  },
  // Status effects
  hurt: {
    vfxName: 'hurt',
    duration: 250
  },
  attackBlocked: {
    vfxName: 'attackBlocked',
    duration: 340
  },
  heal: {
    vfxName: 'heal',
    duration: 500
  },
  filler: {
    vfxName: 'filler',
    duration: 500
  }
} as Record<string, VFX>;
