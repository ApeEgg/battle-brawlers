import { page } from '$app/stores';
import type { DBEquipment, EquipmentType, EquipmentSlot } from '$src/types/equipment';
import { get } from 'svelte/store';
import app from '$src/app.svelte';
import type { Character } from '$src/types/character';

const decideEquipmentSlot = (slotsIn: EquipmentType, character: Character) => {
  if (slotsIn === 'oneHand') {
    const mainHand = character.equipment.mainHand;
    const offHand = character.equipment.offHand;

    if (!mainHand) {
      slotsIn = 'mainHand';
    } else if (!offHand) {
      slotsIn = 'offHand';
    } else {
      slotsIn = 'mainHand';
    }
  }

  if (slotsIn === 'twoHand') {
    slotsIn = 'mainHand';
  }

  return slotsIn;
};

export const equip = (equipment: DBEquipment, index: number) => {
  const characterIndex = Number(get(page)?.params.characterIndex);
  if (characterIndex === undefined) return;

  const character = app.characters[characterIndex];

  const slotsIn = decideEquipmentSlot(equipment.slotsIn, character);

  const slot = character.equipment[slotsIn];

  // Remove item from inventory (equipment)
  app.equipment.splice(index, 1);

  // If something is already in the slot, push it to inventory
  if (slot !== null) {
    app.equipment.push(slot);
  }

  // If two handed weapon is being equipped, check if offHand needs to go to inventory
  if (equipment.slotsIn === 'twoHand' && character.equipment.offHand) {
    app.equipment.push(character.equipment.offHand);
    character.equipment.offHand = null;
  }

  // If oneHanded weapon is being equipped, check if mainHand is two hand (thus need to go to inventory)
  if (
    (slotsIn === 'mainHand' || slotsIn === 'offHand') &&
    character.equipment.mainHand?.slotsIn === 'twoHand'
  ) {
    app.equipment.push(character.equipment.mainHand);
    character.equipment.mainHand = null;
  }

  // Replace whatever is in the slot
  character.equipment[slotsIn] = equipment;
};

export const unequip = (equipment: DBEquipment, slot: EquipmentSlot) => {
  const characterIndex = Number(get(page)?.params.characterIndex);
  if (characterIndex === undefined) return;

  const character = app.characters[characterIndex];

  app.equipment.push(equipment);
  character.equipment[slot] = null;
};

export const slotsInPrettyName = (slotsIn: EquipmentType) =>
  ({
    twoHand: 'Two-Handed',
    oneHand: 'One-Handed',
    mainHand: 'Mainhand',
    offHand: 'Offhand',
    accessory: 'Accessory',
    trinket: 'Trinket',
    armor: 'Armor'
  })[slotsIn];
