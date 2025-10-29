// See vite.config.js in root. This project uses sveltekit-autoimport.

interface Window {
  ws: any;
}

declare module 'async-await-websockets/client';
declare module '$svelte-game-engine';
declare module 'gl-vec2';
declare module 'lodash';
declare module 'sveltekit-autoimport';
declare module 'seedrandom';

declare const tw: (typeof import('tailwind-merge'))['default'];
declare const ENV: (typeof import('$src/constants/ENV_VARS'))['default'];
declare const app: (typeof import('$src/app.svelte.ts'))['default'];
declare const onMount: import('svelte').LifecycleHook<void>;
declare const onDestroy: import('svelte').LifecycleHook<void>;
declare const tooltip: (typeof import('$src/ts/use'))['tooltip'];
