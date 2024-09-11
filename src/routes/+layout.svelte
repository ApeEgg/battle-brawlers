<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import '$src/store/settings';
  const { token } = STORES;
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
    <slot />
  </Row>
</Row>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
