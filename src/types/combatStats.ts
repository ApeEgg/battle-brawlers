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
};

export const prettyCombatStatKey = (key: string) =>
  ({
    maxArmor: 'Armor',
    damage: 'Damage',
    maxHealth: 'Health',

    bleeding: 'Bleeding',
    stunned: 'Stunned',
    vulnerable: 'Vulnerable',

    criticalChance: 'Critical chance',
    criticalDamage: 'Critical damage',
    dodgeChance: 'Dodge chance',
    blockChance: 'Block chance',
    magicChance: 'Enchantment chance'
  })[key] || key;

export const prettyCombatStatValue = (key: string, value: number) =>
  (
    ({
      criticalChance: `${value * 100}%`,
      criticalDamage: `${value * 100}%`,
      dodgeChance: `${value * 100}%`,
      blockChance: `${value * 100}%`,
      magicChance: `${value * 100}%`
    })[key] || value
  )
    .toString()
    .replace(/^0%$/, '-');
