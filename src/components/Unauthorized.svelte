<script lang="ts">
  const { settings, keys } = STORES;

  $: ({ escape } = $keys);
  $: ({ loginPageMode } = $settings);
</script>

<crow class="relative p-10 pb-6 glass gap-2 w-full">
  {#if loginPageMode === 0}
    <Login />
  {/if}
  {#if loginPageMode === 1}
    <Register />
  {/if}
  {#if loginPageMode === 2}
    <ForgotPassword />
  {/if}
  <crow>
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
