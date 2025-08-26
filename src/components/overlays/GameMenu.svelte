<script lang="ts">
  const { overlay } = STORES;

  let { onclick } = $props();
</script>

<Frame class="column gap-2">
  <Button secondary onclick={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if app.token}
    <Logout />
  {/if}
</Frame>

<Close {onclick} />
