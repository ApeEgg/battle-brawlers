<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import '$src/store/settings';
  import type { Snippet } from 'svelte';
  const { token } = STORES;

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !$token);
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'w-screen min-h-screen bg-no-repeat bg-cover bg-center bg-blur',
    isFrontpage
      ? 'bg-[url("/images/desktop-1920x1080.jpg")] row'
      : 'bg-[url("/images/parchment-bg.jpg")] dark:bg-gray-800 row-up'
  )}
>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))]',
      isFrontpage ? 'row' : 'row-up-left max-w-7xl w-full'
    )}
  >
    {@render children()}
  </div>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
