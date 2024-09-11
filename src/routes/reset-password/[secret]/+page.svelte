<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const { socket } = STORES;
  const { notify } = ACTIONS;

  let password = '';
  let error: boolean | string | undefined = undefined;

  const reset = async () => {
    try {
      await $socket.sendAsync('user/password/set-new', {
        secret: $page.params.secret,
        password
      });

      await goto('/', { replaceState: true });
      notify({ success: 'your new password was set' });
    } catch (error) {
      notify(error);
    }
  };
  $: $socket &&
    (async () => {
      try {
        await $socket.sendAsync('user/password/reset-eligibility', {
          secret: $page.params.secret
        });
        error = false;
      } catch (e: any) {
        error = e.error;
      }
    })();
</script>

<h2>Password reset</h2>

{#if error}
  <div>{error}<br /><br /><a href="/">Go to startpage</a></div>
{:else if error === false}
  <form on:submit|preventDefault={reset}>
    <Input type="password" bind:value={password} placeholder="Enter a new password" />
    <Button type="submit">Submit</Button>
  </form>
{/if}
