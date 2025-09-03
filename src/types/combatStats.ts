export type CombatStats = {
  maxHealth?: number;
  currentHealth?: number;
  damage?: number;
  maxEnergy?: number;
  currentEnergy?: number;
  armor?: number;
};

export type EnforcedCombatState = CombatStats & {
  maxHealth: number;
  currentHealth: number;
  damage: number;
  armor: number;
};
