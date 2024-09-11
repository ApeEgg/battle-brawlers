<script lang="ts">
  const { token, overlay } = STORES;
</script>

<Frame class="column gap-2">
  <Button secondary on:click={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if $token}
    <Logout />
  {/if}
</Frame>

<Close on:click />
