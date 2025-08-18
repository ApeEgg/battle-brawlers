import characters from '$src/constants/CHARACTERS';
import seedRandom from 'seedrandom';
import type { Race } from '$src/types/character';
import type { Team } from '$src/types/team';
import type { Combatant } from '$src/types/combatant';

export const calculateCombatStats = (...args: any) => {
  const combined = args.reduce((acc: any, obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
  return combined;
};

export const prepareCombatant = ({
  name,
  race,
  actions
}: {
  name: string;
  race: Race;
  actions: any[];
}): Combatant => {
  const combatStats = calculateCombatStats(characters[race].combatStats);

  combatStats.currentHealth = combatStats.maxHealth;

  return {
    name,
    race: characters[race].prettyName,
    combatStats,
    actions
  };
};

export const generateCombat = (seed: string, teams: Team[]) => {
  return teams.flatMap((team) =>
    team.combatants.map((combatant) => ({ teamIndex: team.index, ...combatant }))
  );
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
