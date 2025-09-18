export type CombatStats = {
  maxHealth?: number;
  currentHealth?: number;
  damage?: number;
  maxArmor?: number;
  currentArmor?: number;
};

export const prettyCombatStatKey = (key: string) =>
  ({
    maxArmor: 'Armor',
    damage: 'Damage',
    maxHealth: 'Health'
  })[key] || key;
