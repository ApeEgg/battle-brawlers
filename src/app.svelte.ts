import type { Combat } from '$src/types/combat';
import type { CharacterRef } from '$src/types/character';

import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '$src/app.svelte';
import type { EquipmentRef } from '$src/types/equipment';
import type { Tooltip } from '$src/ts/use';
import type { Team } from '$src/types/team';
import type { Dialog } from '$src/ts/dialog';
import type { DynamicObject } from '$src/types/common';
import loadLocalStorage from '$src/ts/loadLocalStorage';
import { browser } from '$app/environment';
import mediaQuery from '$src/ts/mediaQuery';

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0,
  winningTeam: undefined
};

const INITIAL_CHARACTERS: Required<CharacterRef>[] = [];
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
const INITIAL_COINS = 400; // One silver

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
  bossHighscore: number = $state(0);

  characters: Required<CharacterRef>[] = $state(INITIAL_CHARACTERS);
  inventory: EquipmentRef[] = $state(INITIAL_INVENTORY);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  selectedBrawlers: string[] = $state([]);

  tooltip?: Tooltip = $state();
  dialog?: Dialog = $state();
  showAccountProgression: boolean = $state(false);
  notifications: string[] = $state([]);

  gameKeyboardDisabled: boolean = $state(false);
  keys: DynamicObject = $state({});
  overlay: string = $state('');
  settings: DynamicObject = $state(
    loadLocalStorage({
      loginPageMode: 0,
      openProperties: {},
      debugOpen: false
    })
  );
  mqs = mediaQuery({
    desktop: '(min-width: 1200px)',
    tablet: '(min-width: 768px) and (max-width: 1199px)',
    smartphone: '(max-width: 767px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    hoverable: '(hover: hover)'
  });

  constructor() {
    $effect.root(() => {
      $effect(() => {
        const settings = $state.snapshot(this.settings);

        Object.entries(settings).forEach(
          ([key, value]) => browser && window.localStorage.setItem(key, JSON.stringify(value))
        );
      });
      $effect(() => {
        const inventory = $state.snapshot(this.inventory); // Hack to trigger reruns
        const characters = $state.snapshot(this.characters); // Hack to trigger reruns
        const experience = $state.snapshot(this.experience); // Hack to trigger reruns
        const coins = $state.snapshot(this.coins); // Hack to trigger reruns
        const accountRewards = $state.snapshot(this.accountRewards); // Hack to trigger reruns
        // console.log(app.syncPerformanceNow);
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
    function flatSnapshot(o: any) {
      const out: any = {};
      let p = o;
      while ((p = Object.getPrototypeOf(p)) && p !== Object.prototype) {
        for (const n of Object.getOwnPropertyNames(p)) {
          const d = Object.getOwnPropertyDescriptor(p, n);
          if (d?.get && !(n in out)) {
            try {
              out[n] = o[n];
            } catch {
              console.error('Failed to get property', n);
            }
          }
        }
      }
      return out;
    }
    return flatSnapshot(this);
  }
})();
