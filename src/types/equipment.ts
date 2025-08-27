import type { Ability } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';

export type EquipmentSlot = 'mainHand' | 'offHand' | 'armor' | 'accessory' | 'trinket';
export type EquipmentType = EquipmentSlot | 'oneHand' | 'twoHand';

export type DBEquipment = {
  id: string;
  slotsIn: EquipmentType;
};

export type Equipment = DBEquipment & {
  uuid: string;
  prettyName: string;
  description: string;
  combatStats: CombatStats;
  abilities: Ability[];
};

export type CharacterEquipment = {
  mainHand: DBEquipment | null;
  offHand: DBEquipment | null;
  armor: DBEquipment | null;
  accessory: DBEquipment | null;
  trinket: DBEquipment | null;
};
