<script lang="ts">
  import { AUDIO } from '$src/app.svelte';

  let { audio, elapsedMilliseconds } = $props();

  // let queue: any[] = $state([]);
  let played: any[] = $state([]);
  let raf: any = $state(null);
  let queue: any[] = $state([]);

  $effect(() => {
    // reading queue here makes the effect depend on queue,
    // which is fine as long as we don't write back unnecessarily.
    const q = new Set(queue.map(({ id }) => id));
    const p = new Set(played.map(({ id }) => id));
    const incoming = audio.filter(({ id }) => !q.has(id) && !p.has(id));

    // 🔑 guard: only assign if there is a change
    if (!incoming.length) return;

    // now we mutate once, which causes one extra run;
    // on the next run incoming will be empty, so no write, and it settles.
    queue = [...queue, ...incoming].sort((a, b) => a.start - b.start);
  });

  const playSfx = (sfx: any) => {
    const randomOne = sfx.variants[Math.floor(Math.random() * sfx.variants.length)];
    // console.info('playing sfx', randomOne);
    new Howl({ src: AUDIO[randomOne] }).play();
    // app.audio[randomOne]?.play();
  };

  const loop = () => {
    while (queue.length && queue[0].start <= elapsedMilliseconds) {
      const [sfx, ...restOfQueue] = queue;
      played = [...played, sfx];
      queue = restOfQueue;
      playSfx(sfx);
    }

    raf = requestAnimationFrame(loop);
  };

  onMount(() => {
    raf = requestAnimationFrame(loop);
  });

  onDestroy(() => {
    if (raf != null) cancelAnimationFrame(raf);
  });
</script>

<!-- <pre>
{JSON.stringify(queue, null, 2)}
</pre> -->
