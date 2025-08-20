<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import '../crow.css';
  import '$src/store/settings';
  import type { Snippet } from 'svelte';
  import Authorization from '$src/components/Authorization.svelte';
  const { token } = STORES;

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !$token);
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'bg-blur min-h-screen w-screen bg-cover bg-center bg-no-repeat',
    isFrontpage
      ? 'row bg-[url("/images/desktop-1920x1080.jpg")]'
      : 'row-up bg-[url("/images/parchment-bg.jpg")] dark:bg-gray-800'
  )}
>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))]',
      isFrontpage ? 'row' : 'row-up-left w-full max-w-7xl'
    )}
  >
    <Authorization>
      {@render children()}
    </Authorization>
  </div>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
