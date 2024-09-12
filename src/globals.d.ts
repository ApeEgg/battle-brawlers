// See vite.config.js in root. This project uses sveltekit-autoimport.

interface Window {
  ws: any;
}

declare module 'async-await-websockets';
declare module 'svelte-global-store';
declare module '$svelte-game-engine';

declare const tw: (typeof import('tailwind-merge'))['default'];
declare const ACTIONS: (typeof import('$src/store/actions'))['default'];
declare const STORES: (typeof import('$src/store/stores'))['default'];
declare const ENV: (typeof import('$src/constants/ENV_VARS'))['default'];
declare const Tooltip: (typeof import('svelte-component-kit'))['Tooltip'];
declare const onMount: import('svelte').LifecycleHook<void>;
declare const onDestroy: import('svelte').LifecycleHook<void>;

declare const Clickable: import('svelte').ComponentType<
  (typeof import('$src/components/buttons/Clickable'))['default']
>;
declare const Close: import('svelte').ComponentType<
  (typeof import('$src/components/buttons/Close'))['default']
>;
declare const Logout: import('svelte').ComponentType<
  (typeof import('$src/components/buttons/Logout'))['default']
>;
declare const Background: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/Background'))['default']
>;
declare const Canvas: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/Canvas'))['default']
>;
declare const Character: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/Character'))['default']
>;
declare const FPS: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/FPS'))['default']
>;
declare const Grid: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/Grid'))['default']
>;
declare const HexGrid: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/HexGrid'))['default']
>;
declare const Text: import('svelte').ComponentType<
  (typeof import('$src/components/canvas/Text'))['default']
>;
declare const Button: import('svelte').ComponentType<
  (typeof import('$src/components/form/Button'))['default']
>;
declare const Checkbox: import('svelte').ComponentType<
  (typeof import('$src/components/form/Checkbox'))['default']
>;
declare const Dropdown: import('svelte').ComponentType<
  (typeof import('$src/components/form/Dropdown'))['default']
>;
declare const Input: import('svelte').ComponentType<
  (typeof import('$src/components/form/Input'))['default']
>;
declare const ConnectSocket: import('svelte').ComponentType<
  (typeof import('$src/components/global/ConnectSocket'))['default']
>;
declare const Keystrokes: import('svelte').ComponentType<
  (typeof import('$src/components/global/Keystrokes'))['default']
>;
declare const MouseTracker: import('svelte').ComponentType<
  (typeof import('$src/components/global/MouseTracker'))['default']
>;
declare const Notifications: import('svelte').ComponentType<
  (typeof import('$src/components/global/Notifications'))['default']
>;
declare const Overlay: import('svelte').ComponentType<
  (typeof import('$src/components/global/Overlay'))['default']
>;
declare const CodeOfConduct: import('svelte').ComponentType<
  (typeof import('$src/components/overlays/CodeOfConduct'))['default']
>;
declare const GameMenu: import('svelte').ComponentType<
  (typeof import('$src/components/overlays/GameMenu'))['default']
>;
declare const ReleaseNotes: import('svelte').ComponentType<
  (typeof import('$src/components/overlays/ReleaseNotes'))['default']
>;
declare const Info: import('svelte').ComponentType<
  (typeof import('$src/components/tooltips/Info'))['default']
>;
declare const Column: import('svelte').ComponentType<
  (typeof import('$src/components/ui/Column'))['default']
>;
declare const Icon: import('svelte').ComponentType<
  (typeof import('$src/components/ui/Icon'))['default']
>;
declare const Row: import('svelte').ComponentType<
  (typeof import('$src/components/ui/Row'))['default']
>;
declare const Async: import('svelte').ComponentType<
  (typeof import('$src/components/Async'))['default']
>;
declare const Authorized: import('svelte').ComponentType<
  (typeof import('$src/components/Authorized'))['default']
>;
declare const ForgotPassword: import('svelte').ComponentType<
  (typeof import('$src/components/ForgotPassword'))['default']
>;
declare const Frame: import('svelte').ComponentType<
  (typeof import('$src/components/Frame'))['default']
>;
declare const Loader: import('svelte').ComponentType<
  (typeof import('$src/components/Loader'))['default']
>;
declare const Login: import('svelte').ComponentType<
  (typeof import('$src/components/Login'))['default']
>;
declare const Logo: import('svelte').ComponentType<
  (typeof import('$src/components/Logo'))['default']
>;
declare const Register: import('svelte').ComponentType<
  (typeof import('$src/components/Register'))['default']
>;
declare const Topbar: import('svelte').ComponentType<
  (typeof import('$src/components/Topbar'))['default']
>;
declare const Unauthorized: import('svelte').ComponentType<
  (typeof import('$src/components/Unauthorized'))['default']
>;
