export type CombatStats = {
  maxHealth?: number;
  currentHealth?: number;
  damage?: number;
  maxArmor?: number;
  currentArmor?: number;
  criticalChance?: number;
  criticalDamage?: number;
  dodgeChance?: number;
  blockChance?: number;
  magicChance?: number;
  limits: {
    wounded: number;
    concussed: number;
    exposed: number;
  };
  modifiers: {
    maxHealth: number;
    maxArmor: number;
    damage: number;
  };
};

export const prettyCombatStatKey = (key: string) =>
  ({
    maxArmor: 'Armor',
    damage: 'Damage',
    maxHealth: 'Health',
    resistance: 'All resistances',

    bleeding: 'Bleeding',
    stunned: 'Stunned',
    vulnerable: 'Vulnerable',

    criticalChance: 'Critical chance',
    criticalDamage: 'Critical damage',
    dodgeChance: 'Dodge chance',
    blockChance: 'Block chance',
    magicChance: 'Magic chance'
  })[key] || key;

// export const prettyCombatStatValue = (key: string, value: number) =>
//   (
//     ({
//       criticalChance: `${(value * 100).toFixed(0)}%`,
//       criticalDamage: `${(value * 100).toFixed(0)}%`,
//       dodgeChance: `${(value * 100).toFixed(0)}%`,
//       blockChance: `${(value * 100).toFixed(0)}%`,
//       magicChance: `${(value * 100).toFixed(0)}%`
//     })[key] || value
//   )
//     .toString()
//     .replace(/^0%$/, '-');

export const prettyCombatStatValue = (key: string, value: number) =>
  value === 0 ? '-' : value > 1 ? value : `${(value * 100).toFixed(0)}%`;
