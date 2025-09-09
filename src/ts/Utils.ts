import seedRandom from 'seedrandom';
import type { Combatant } from '$src/types/combatant';
import type { Character } from '$src/types/character';
import { AbilityType, type Ability, type AbilityRef } from '$src/types/ability';
import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';
import EQUIPMENT from '$src/constants/EQUIPMENT';
import ABILITIES from '$src/constants/ABILITIES';

export const calculateCombatStats = (...args: any) => {
  const combined = args.reduce((acc: any, obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
  return combined;
};

export const calculateAvailableAbilitiesByCharacter = (character: Character) =>
  Object.entries(character.equipment).flatMap(([slot, eq]) => {
    if (!eq) return [];
    const equipment = EQUIPMENT(eq, true);

    return equipment.abilities.map((a: any, abilityIndex: number) => {
      const instanceKey = `${character.id}::${slot}::${equipment.id}::${a.id}::${abilityIndex}`;
      return {
        ...a,
        uuid: instanceKey
      } as AbilityRef;
    });
  });

export const calculateCombatStatsByCharacter = (character: Character) => {
  return calculateCombatStats(
    ...[
      character.combatStats,
      ...Object.values(character.equipment)
        .filter((e) => e !== null)
        .map((e) => EQUIPMENT(e, true).combatStats)
    ]
  );
};

export const calculateTickStart = (abilities: Ability[], index: number) => {
  let tickStart = 0;
  for (let i = 0; i < index; i++) {
    tickStart += abilities[i].ticks;
  }
  return tickStart;
};

export const prepareCombatant = (
  character: Character,
  teamCount: number,
  combatantCount: number,
  teamIndex: number,
  combatantIndex: number
): Combatant => {
  const rotation = 360 / teamCount;

  const combatStats = calculateCombatStatsByCharacter(character);

  combatStats.currentHealth = combatStats.maxHealth;
  combatStats.currentArmor = combatStats.maxArmor;

  const abilitiesHydrated = (
    character.abilities.map((ability) => ABILITIES(ability, true)) as Ability[]
  ).map((ability) => {
    const { calc, ...rest } = ability;

    return {
      ...rest,
      damage: ability.calc.damage()?.result || 0,
      healing: ability.calc.healing()?.result || 0
    };
  });

  const abilitiesCut = abilitiesHydrated.filter(
    (_, i) => calculateTickStart(abilitiesHydrated, i) < character.maxTicks
  );

  const abilitiesCopied = abilitiesCut.reduce((a, ability, i) => {
    const start = a[i - 1]?.end || 0;
    const end = start + ability.ticks * COMBAT_TICK_TIME;
    return [...a, { ...ability, start, end }];
  }, [] as Ability[]);

  const abilities = abilitiesCut
    .reduce((a, ability) => {
      return ability?.chainLink
        ? [
            ...a,
            ...Array(ability.chainLink)
              .fill(0)
              .map((_, i) => {
                const { chainLink, ...ab } = ability;

                ab.type = AbilityType.WindUp;
                ab.ticks = (ability.ticks / (ability?.chainLink as number)) as Ability['ticks'];
                if (i + 1 !== ability.chainLink) {
                  ab.chainTo = i + 1;
                }

                return ab;
              })
          ]
        : [...a, ability];
    }, [] as Ability[])
    .reduce((a, ability, i) => {
      const start = a[i - 1]?.end || 0;
      const end = start + ability.ticks * COMBAT_TICK_TIME;
      return [...a, { ...ability, start, end }];
    }, [] as Ability[]);

  const radius = COMBAT_RING_BASE_RADIUS;

  const rot =
    teamIndex * rotation +
    270 -
    rotation / 2 +
    (rotation / (combatantCount + 1)) * (combatantIndex + 1);

  const rotRadians = (rot * Math.PI) / 180;
  const position = {
    x: Math.sin(rotRadians) * radius,
    y: Math.cos(rotRadians) * radius,
    rot
  };

  return {
    ...character,
    id: crypto.randomUUID(), // this is needed for debug mode
    teamIndex,
    eventTimestamp: 0,
    eventAbility: abilitiesCut[0].id,
    eventIndex: 0,
    combatStats,
    animations: [],
    injectedAnimations: [],
    position,
    statuses: {
      isBlocking: false,
      knockedOut: 0,
      isStunned: {
        ticks: 0,
        value: 0
      },
      isBleeding: {
        ticks: 0,
        value: 0
      }
    },
    abilities,
    abilitiesCopied
  };
};

export const seededRandom = (min: number, max: number, string: string) =>
  random(min, max, seedRandom(string)());

export const random = (min: number, max: number, factor = Math.random()) =>
  Math.floor(factor * (max - min + 1) + min);

export const colorStrength = (col: any, amt: any) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
