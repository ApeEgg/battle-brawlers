export type CombatStats = {
  maxHealth?: number;
  currentHealth?: number;
  damage?: number;
  maxEnergy?: number;
  currentEnergy?: number;
  maxArmor?: number;
  currentArmor?: number;
};

export type EnforcedCombatState = CombatStats & {
  maxHealth: number;
  currentHealth: number;
  damage: number;
  maxArmor: number;
  currentArmor: number;
};
