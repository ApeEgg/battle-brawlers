<script lang="ts">
  import { getCookie } from '$src/helpers';
  import { version } from '../../package.json';

  const { IS_DEV } = ENV;
  const { notify } = ACTIONS;

  onMount(() => (app.token = getCookie()?.token));

  let authorized: any = $state(false);
  let connected = $derived(app.socket);

  $effect(() => {
    if (app.token && connected) {
      (async () => {
        try {
          authorized = await app.socket.sendAsync('user/authenticate', {
            token: app.token,
            clientVersion: version,
            IS_DEV
          });
          if (authorized !== true) {
            app.characters = authorized.characters;
            app.inventory = authorized.inventory;
          }
        } catch (e) {
          notify(e);
          app.token = undefined;
        }
      })();
    } else {
      authorized = false;
    }
  });
</script>

{#if !connected}
  <Loader>Connecting to server</Loader>
{:else if authorized}
  <slot />
{:else if !app.token}
  <Unauthorized />
{/if}
