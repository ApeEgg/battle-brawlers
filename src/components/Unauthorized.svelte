<script lang="ts">
  const { settings, keys } = STORES;

  $: ({ escape } = $keys);
  $: ({ loginPageMode } = $settings);
</script>

<crow vertical class="glass relative w-full gap-2 p-10 pb-6">
  {#if loginPageMode === 0}
    <Login />
  {/if}
  {#if loginPageMode === 1}
    <Register />
  {/if}
  {#if loginPageMode === 2}
    <ForgotPassword />
  {/if}
  <crow class="gap-2">
    {#if loginPageMode !== 0}
      <Button tertiary onclick={() => ($settings.loginPageMode = 0)} blur={escape}>Login</Button>
    {/if}
    {#if loginPageMode !== 1}
      <Button tertiary onclick={() => ($settings.loginPageMode = 1)} blur={escape}>Register</Button>
    {/if}
    {#if loginPageMode !== 2}
      <Button tertiary onclick={() => ($settings.loginPageMode = 2)} blur={escape}>
        Forgot password
      </Button>
    {/if}
  </crow>
</crow>
