<script lang="ts">
  const { overlay } = STORES;
  const logout = () => {
    document.cookie = 'token=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    app.token = undefined;
    $overlay = '';
    window.location.href = '/';
  };
</script>

<Button onclick={logout}>Log out</Button>
