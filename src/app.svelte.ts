import type { Combat } from '$src/types/combat';
import type { Character } from '$src/types/character';
import CHARACTERS, { DEFAULT_EQUIPMENT } from '$src/constants/CHARACTERS';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';
import type { EquipmentRef } from '$src/types/equipment';
import type { Tooltip } from '$src/ts/use';
import EQUIPMENT from '$src/constants/EQUIPMENT';
import ABILITIES from '$src/constants/ABILITIES';

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0
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
      equipment: { ...DEFAULT_EQUIPMENT },
      abilities: DEFAULT_ABILITIES
    }
  }),
  CHARACTERS('troll', false, {
    overrides: { name: 'Tanky Tom', equipment: DEFAULT_EQUIPMENT, abilities: DEFAULT_ABILITIES }
  }),
  CHARACTERS('goblin', false, {
    overrides: { name: 'Greedy Gerald', equipment: DEFAULT_EQUIPMENT, abilities: DEFAULT_ABILITIES }
  }),
  CHARACTERS('human', false, {
    overrides: { name: 'Humble Hans', equipment: DEFAULT_EQUIPMENT, abilities: DEFAULT_ABILITIES }
  }),
  CHARACTERS('dwarf', false, {
    overrides: { name: 'Dense Darrin', equipment: DEFAULT_EQUIPMENT, abilities: DEFAULT_ABILITIES }
  })
];

// const INITIAL_INVENTORY = [EQUIPMENT('sword'), EQUIPMENT('giantsHeart'), EQUIPMENT('dagger')];
const INITIAL_INVENTORY = [
  EQUIPMENT('sword'),
  EQUIPMENT('dagger'),
  EQUIPMENT('dagger'),
  EQUIPMENT('shield'),
  EQUIPMENT('greatSword'),
  EQUIPMENT('leatherBoots')
];

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
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

        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              await app.socket.sendAsync('store-game-state', {
                token: app.token,
                inventory,
                characters
              });
              console.info('Game state saved');
            })();
          }
        }, 1000);

        return () => clearTimeout(saveDebounce);
      });
    });
  }
})();
