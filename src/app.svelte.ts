import type { Combat } from '$src/types/combat';
import type { Character } from '$src/types/character';
import CHARACTERS from '$src/constants/CHARACTERS';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';
import type { EquipmentRef } from '$src/types/equipment';
import type { Tooltip } from '$src/ts/use';
import entity from '$src/ts/entity';

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0
};

const INITIAL_CHARACTERS = [
  {
    ...CHARACTERS.elf(),
    name: 'Elon the Elf'
  }
  // { ...CHARACTERS.dwarf(), name: 'Danny' }
];

const INITIAL_INVENTORY = [
  entity.equipment('sword'),
  entity.equipment('giantsHeart'),
  entity.equipment('dagger')
];

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  characters: Character[] = $state(INITIAL_CHARACTERS);
  inventory: EquipmentRef[] = $state(INITIAL_INVENTORY);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  tooltip?: Tooltip = $state();

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
