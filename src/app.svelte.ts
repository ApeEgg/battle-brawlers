import type { Combat } from '$src/types/combat';
import type { Character } from '$src/types/character';
import CHARACTERS from '$src/constants/CHARACTERS';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0
};

const INITIAL_CHARACTERS = [
  { ...CHARACTERS.elf(), name: 'Elon the Elf' },
  { ...CHARACTERS.dwarf(), name: 'Danny' }
];

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  characters: Character[] = $state(INITIAL_CHARACTERS);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();

  constructor() {
    $effect.root(() => {
      $effect(() => {
        $state.snapshot(this.characters); // Hack to trigger reruns

        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              await app.socket.sendAsync('store-game-state', {
                token: app.token,
                characters: $state.snapshot(this.characters)
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
