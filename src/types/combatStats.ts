export type CombatStats = {
  maxHealth?: number;
  currentHealth?: number;
  damage?: number;
  maxArmor?: number;
  currentArmor?: number;
  limits?: {
    wounded: number;
    concussed: number;
    exposed: number;
  };
};
