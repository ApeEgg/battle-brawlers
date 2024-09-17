<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import '$src/store/settings';
  import type { Snippet } from 'svelte';
  const { token } = STORES;

  let { children } = $props<{ children: Snippet }>();
</script>

<ConnectSocket />
<Keystrokes />

<Row
  class={tw(
    'w-screen min-h-screen bg-no-repeat bg-cover bg-center bg-blur',
    $page.route.id === '/' && !$token
      ? 'bg-[url("/images/desktop-1920x1080.jpg")]'
      : 'bg-gray-200 dark:bg-gray-800'
  )}
>
  <Row class="xs:w-[calc(100%-theme(space.4))]">
    {@render children()}
  </Row>
</Row>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
