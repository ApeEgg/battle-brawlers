<script lang="ts">
  import Portal from 'svelte-portal';
</script>

<Headline text="start" />

Wip..

<div class="h-[3000px] w-5 bg-green-100" />

<Portal target="#sticky-bottom">
  <crow class="gap-3 bg-gradient-to-t from-black to-transparent p-4" right>
    <Button tertiary onclick={() => {}}>Cancel</Button>

    <Button big bgColor="bg-red-500" onclick={() => {}}>Fight</Button>
  </crow>
</Portal>
