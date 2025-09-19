<script lang="ts">
  const { overlay } = STORES;

  let { onclick } = $props();
</script>

<Frame title="options">
  <Button secondary onclick={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if app.token}
    <Logout />
  {/if}
</Frame>

<Close {onclick} />
