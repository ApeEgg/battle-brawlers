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

export const RECRUITABLE_CHARACTERS = [
  CHARACTERS('elf', false, {
    overrides: {
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('bow', false, {
          overrides: {
            name: 'Basic Bow',
            abilities: [
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, { overrides: { name: 'Basic Pierce', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('troll', false, {
    overrides: {
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('club', false, {
          overrides: {
            name: 'Basic Club',
            abilities: [
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } }),
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } }),
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('goblin', false, {
    overrides: {
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('dagger', false, {
          overrides: {
            name: 'Basic Dagger',
            abilities: [
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('dagger', false, {
          overrides: {
            name: 'Basic Dagger',
            abilities: [
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('human', false, {
    overrides: {
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('dwarf', false, {
    overrides: {
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('hammer', false, {
          overrides: {
            name: 'Basic Hammer',
            abilities: [
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              }),
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              })
            ]
          }
        }),
        offHand: EQUIPMENT('shield', false, {
          overrides: {
            name: 'Basic Shield',
            abilities: [
              ABILITIES('block'),
              ABILITIES('shieldBash', false, {
                overrides: { name: 'Basic Shield Bash', statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  })
];
const INITIAL_CHARACTERS = [];

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
