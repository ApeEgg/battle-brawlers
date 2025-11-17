<script lang="ts">
  import Headline from '$src/components/Headline.svelte';

  // import Portal from 'svelte-portal';
</script>

<Headline text="start" />

Battle Brawlers is a strategy auto-battler in your browser.
<br /><br />
Your main objective is to upgrade your Ludus by obtaining experience & leveling it up.
<br /><br />
You can recruit Brawlers to fight for you. Each brawler can be equipped with unique items and abilities.
<br /><br />
Every 5 Ludus-level you unlock an additional Brawler-slot.
<br /><br />

<Headline text="Combat" small />
Combat is automatic once you start a fight.
<br /><br />
Battle Brawlers utilizes a "tick system". A tick cycle is normally 12 ticks, but can expand up to 15
ticks. Each ability you put on your "Active abilities" has a tick-length to them. This is the duration
for which the ability is cast/active.
<br /><br />
Tick cycles repeat until there is a winner.

<!-- <div class="h-[3000px] w-5 bg-green-100" /> -->

<!-- <Portal target="#sticky-bottom">
  <crow class="gap-3 bg-gradient-to-t from-black to-transparent p-4" right>
    <Button tertiary onclick={() => {}}>Cancel</Button>

    <Button big bgColor="bg-red-500" onclick={() => {}}>Fight</Button>
  </crow>
</Portal> -->
