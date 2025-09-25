import type { Combat } from '$src/types/combat';
import type { Character, CharacterRef } from '$src/types/character';
import CHARACTERS, { DEFAULT_EQUIPMENT } from '$src/constants/CHARACTERS';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';
import type { EquipmentRef } from '$src/types/equipment';
import type { Tooltip } from '$src/ts/use';
import EQUIPMENT from '$src/constants/EQUIPMENT';
import ABILITIES from '$src/constants/ABILITIES';
import type { Team } from '$src/types/team';
import type { Dialog } from '$src/ts/dialog';

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
      name: 'Elon',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('bow', false, {
          overrides: {
            name: 'Basic Bow',
            cost: 0,
            level: 1,
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
      name: 'Throk',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('club', false, {
          overrides: {
            name: 'Basic Club',
            cost: 0,
            level: 1,
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
      name: 'Grish',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('dagger', false, {
          overrides: {
            name: 'Basic Dagger',
            cost: 0,
            level: 1,
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
            cost: 0,
            level: 1,
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
      name: 'Hebert',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            cost: 0,
            level: 1,
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
      name: 'Durak',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('hammer', false, {
          overrides: {
            name: 'Basic Hammer',
            cost: 0,
            level: 1,
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
            cost: 0,
            level: 1,
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
const INITIAL_CHARACTERS: Character[] = [];
// const INITIAL_INVENTORY = [
//   EQUIPMENT('sword'),
//   EQUIPMENT('sword'),
//   EQUIPMENT('dagger'),
//   EQUIPMENT('dagger'),
//   EQUIPMENT('shield'),
//   EQUIPMENT('greatSword'),
//   EQUIPMENT('leatherBoots')
// ];
const INITIAL_INVENTORY: EquipmentRef[] = [];
const INITIAL_COINS = 100; // One silver

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  liveTeams: Team[] = $state([]);
  elapsedMilliseconds: number = $state(0);

  serverTimestampSnapshot: number = $state(0);
  syncPerformanceNow: number = $state(0);
  serverTimestamp: number = $state(0);

  experience: number = $state(0);
  coins: number = $state(INITIAL_COINS);
  accountRewards: number = $state(1);

  characters: CharacterRef[] = $state(INITIAL_CHARACTERS);
  inventory: EquipmentRef[] = $state(INITIAL_INVENTORY);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  selectedBrawlers: string[] = $state([]);

  tooltip?: Tooltip = $state();
  dialog?: Dialog = $state();
  showAccountProgression: boolean = $state(false);

  constructor() {
    $effect.root(() => {
      $effect(() => {
        const inventory = $state.snapshot(this.inventory); // Hack to trigger reruns
        const characters = $state.snapshot(this.characters); // Hack to trigger reruns
        const experience = $state.snapshot(this.experience); // Hack to trigger reruns
        const coins = $state.snapshot(this.coins); // Hack to trigger reruns
        const accountRewards = $state.snapshot(this.accountRewards); // Hack to trigger reruns

        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              const res = await app.socket.sendAsync('store-game-state', {
                token: app.token,
                inventory,
                characters,
                experience,
                coins,
                accountRewards
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

  dump() {
    function flatSnapshot(o) {
      const out = {};
      let p = o;
      while ((p = Object.getPrototypeOf(p)) && p !== Object.prototype) {
        for (const n of Object.getOwnPropertyNames(p)) {
          const d = Object.getOwnPropertyDescriptor(p, n);
          if (d?.get && !(n in out)) {
            try {
              out[n] = o[n];
            } catch {}
          }
        }
      }
      return out;
    }
    return flatSnapshot(this);
  }
})();
