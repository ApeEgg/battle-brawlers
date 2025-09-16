import type { Combat } from '$src/types/combat';
import type { Character } from '$src/types/character';
import CHARACTERS, { DEFAULT_EQUIPMENT } from '$src/constants/CHARACTERS';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';
import type { EquipmentRef } from '$src/types/equipment';
import type { Tooltip } from '$src/ts/use';
import EQUIPMENT from '$src/constants/EQUIPMENT';
import ABILITIES from '$src/constants/ABILITIES';
import type { Team } from '$src/types/team';

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0,
  winningTeam: undefined
};

const DEFAULT_ABILITIES = [
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch')
];

const INITIAL_CHARACTERS = [
  CHARACTERS('elf', false, {
    overrides: {
      name: 'Evasive Elon',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('bow', false, { overrides: { name: 'Default Bow' } })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('troll', false, {
    overrides: {
      name: 'Tanky Tom',
      equipment: DEFAULT_EQUIPMENT,
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('goblin', false, {
    overrides: {
      name: 'Greedy Gerald',
      equipment: DEFAULT_EQUIPMENT,
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('human', false, {
    overrides: {
      name: 'Humble Hans',
      equipment: DEFAULT_EQUIPMENT,
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('dwarf', false, {
    overrides: {
      name: 'Dense Darrin',
      equipment: DEFAULT_EQUIPMENT,
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  })
];

// const INITIAL_INVENTORY = [EQUIPMENT('sword'), EQUIPMENT('giantsHeart'), EQUIPMENT('dagger')];
const INITIAL_INVENTORY = [
  EQUIPMENT('sword'),
  EQUIPMENT('sword'),
  EQUIPMENT('dagger'),
  EQUIPMENT('dagger'),
  EQUIPMENT('shield'),
  EQUIPMENT('greatSword'),
  EQUIPMENT('leatherBoots')
];

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  liveTeams: Team[] = $state([]);
  elapsedMilliseconds: number = $state(0);

  serverTimestampSnapshot: number = $state(0);
  syncPerformanceNow: number = $state(0);
  serverTimestamp: number = $state(0);

  experience: number = $state(0);
  characters: Character[] = $state(INITIAL_CHARACTERS);
  inventory: EquipmentRef[] = $state(INITIAL_INVENTORY);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  tooltip?: Tooltip = $state();
  selectedBrawlers: string[] = $state([]);

  constructor() {
    $effect.root(() => {
      $effect(() => {
        const inventory = $state.snapshot(this.inventory); // Hack to trigger reruns
        const characters = $state.snapshot(this.characters); // Hack to trigger reruns
        const experience = $state.snapshot(this.experience); // Hack to trigger reruns

        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              const res = await app.socket.sendAsync('store-game-state', {
                token: app.token,
                inventory,
                characters,
                experience
              });

              app.serverTimestampSnapshot = res;
              app.syncPerformanceNow = performance.now();
              console.info('Game state saved');
            })();
          }
        }, 1000);

        return () => clearTimeout(saveDebounce);
      });
    });
  }
})();
