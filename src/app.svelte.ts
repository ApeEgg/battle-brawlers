// import type { Notification } from '$types/notifications';
// import type { Workspace } from '$types/workspaces';

import type { Combat } from '$src/types/combat';
import type { Character } from '$src/types/character';
import CHARACTERS from '$src/constants/CHARACTERS';

// const INITIAL_WORKSPACE = {
//   id: 'default',
//   name: 'My iconice icons',
//   svgs: [],
//   temporary: true,
//   download: {
//     iconType: true,
//     reactHelper: true,
//     svelteHelper: true
//   }
// };

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0
};

const INITIAL_CHARACTERS = [CHARACTERS.elf, CHARACTERS.dwarf];

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  characters: Character[] = $state(INITIAL_CHARACTERS);
  // notifications: Notification[] = $state([]);
  // workspaces: Workspace[] = $state([INITIAL_WORKSPACE]);
  // currentWorkspace: number = $state(0);
  // saveTimeouts: { [key: string]: ReturnType<typeof setTimeout> } = $state({});

  // workspace = $derived(this.workspaces[this.currentWorkspace]);

  // constructor() {
  //   $effect.root(() => {
  //     const storedNumbers = localStorage.getItem('workspaces');

  //     if (storedNumbers) {
  //       const parsed = JSON.parse(storedNumbers);
  //       if (!parsed?.Default && Array.isArray(parsed)) this.workspaces = parsed; // TODO: .Default is old version. Remove this check at the day of release
  //     }

  //     $effect(() => {
  //       localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
  //     });
  //     $effect(() => {
  //       if (this.currentWorkspace)
  //         localStorage.setItem('currentWorkspace', this.currentWorkspace.toString());
  //     });
  //   });
  // }
})();
