export type Race = 'elf' | 'human' | 'troll';

export type Character = Record<
  Race,
  { prettyName: string; combatStats: { maxHealth: number; damage: number } }
>;
