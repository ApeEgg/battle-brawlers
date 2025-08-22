import type { AbilityName } from '$src/types/ability';

export type VFXName =
  | 'hurt'
  | 'basicAttackFast'
  | 'basicAttackRegular'
  | 'basicAttackSlow'
  | 'block'
  | 'attackBlocked'
  | 'stun';

export type VFX = {
  id?: string;
  vfxName: AbilityName | VFXName;
  duration: number;
  start: number;
  end: number;
  targetX?: number;
  targetY?: number;
};
