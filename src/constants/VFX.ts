import type { AbilityId } from '$src/types/ability';
import type { VFXName, VFX } from '$src/types/vfx';

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
    duration: 1500 + 250 // lingering time
  },
  stun: {
    vfxName: 'stun',
    duration: 500
  },
  spin: {
    vfxName: 'spin',
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
  }
} as Record<AbilityId | VFXName, VFX>;
