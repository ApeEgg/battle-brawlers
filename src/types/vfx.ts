import type { AbilityId } from '$src/types/ability';

export type VFXName =
  | 'hurt'
  | 'basicAttackFast'
  | 'basicAttackRegular'
  | 'basicAttackSlow'
  | 'block'
  | 'attackBlocked'
  | 'kick'
  | 'whirlwind';

export type VFX = {
  id?: string;
  vfxName: AbilityId | VFXName;
  duration: number;
  start: number;
  end: number;
  targetX?: number;
  targetY?: number;
};
