<script lang="ts">
  const { setOverlay } = ACTIONS;

  const toggleDarkMode = () => {
    const classes = [...document.getElementsByTagName('html')[0].classList];

    document.getElementsByTagName('html')[0].className = classes.includes('dark')
      ? classes.filter((className) => className !== 'dark').join(' ')
      : [...classes, 'dark'].join(' ');
  };
</script>

<Row class="fixed inset-0 bottom-auto" right>
  <Clickable class="dark:hidden w-8 h-8 hover:bg-black/5 row" on:click={toggleDarkMode}>
    <Icon class="text-yellow-500" name="light" />
  </Clickable>
  <Clickable
    class="-translate-y-px hidden dark:row w-8 h-8 hover:bg-black/5"
    on:click={toggleDarkMode}
  >
    <Icon class="text-blue-500" name="dark" />
  </Clickable>
  <Clickable class="w-8 h-8 hover:bg-black/5 row" on:click={setOverlay.bind(undefined, 'GameMenu')}>
    <Icon name="menu" size={20} />
  </Clickable>
</Row>
