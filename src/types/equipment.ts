import type { AbilityRef } from '$src/types/ability';
import type { CombatStats } from '$src/types/combatStats';

export type EquipmentSlot = 'mainHand' | 'offHand' | 'armor' | 'accessory' | 'trinket';
export type EquipmentType = EquipmentSlot | 'oneHand' | 'twoHand';

export type EquipmentRef = {
  uuid?: string;
  id: string;
};

export type Equipment = EquipmentRef & {
  prettyName: string;
  slotsIn: EquipmentType;
  description: string;
  combatStats: CombatStats;
  abilities: AbilityRef[];
};

export type CharacterEquipment = {
  mainHand: EquipmentRef | null;
  offHand: EquipmentRef | null;
  armor: EquipmentRef | null;
  accessory: EquipmentRef | null;
  trinket: EquipmentRef | null;
};
