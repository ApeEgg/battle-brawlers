<script lang="ts">
  const { token, overlay } = STORES;
  const logout = () => {
    document.cookie = 'token= ; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    $token = undefined;
    $overlay = '';
    window.location.href = '/';
  };
</script>

<Button onclick={logout}>Log out</Button>
