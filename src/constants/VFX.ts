import type { AbilityName } from '$src/types/ability';
import type { VFXName, VFX } from '$src/types/vfx';

export default {
  basicAttackFast: {
    vfxName: 'basicAttackFast',
    duration: 500
  },
  basicAttackRegular: {
    vfxName: 'basicAttackRegular',
    duration: 1000
  },
  basicAttackSlow: {
    vfxName: 'basicAttackSlow',
    duration: 1500
  },
  block: {
    vfxName: 'block',
    duration: 1500
  },
  stun: {
    vfxName: 'stun',
    duration: 500
  },
  hurt: {
    vfxName: 'hurt',
    duration: 250
  }
} as Record<AbilityName | VFXName, VFX>;
