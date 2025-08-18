<script lang="ts">
  const { token, overlay } = STORES;

  let { onclick } = $props();
</script>

<Frame class="column gap-2">
  <Button secondary onclick={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if $token}
    <Logout />
  {/if}
</Frame>

<Close {onclick} />
