<script lang="ts">
  let { onclick } = $props();
</script>

<Frame title="options">
  <Button secondary onclick={() => (app.overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if app.token}
    <Logout />
  {/if}
</Frame>

<Close {onclick} />
