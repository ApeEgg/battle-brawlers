<script lang="ts">
  import { renderable, height } from '$svelte-game-engine';
  import type { Snippet } from 'svelte';

  let {
    text = '',
    frames = 0,
    prevTime = performance.now(),
    children
  }: {
    text?: string;
    frames?: number;
    prevTime?: number;
    children?: Snippet;
  } = $props();

  renderable(() => {
    let time = performance.now();
    frames++;
    if (time >= prevTime + 1000) {
      const fps = (frames * 1000) / (time - prevTime);
      text = `${fps.toFixed(1)} FPS`;
      prevTime = time;
      frames = 0;
    }
  });
</script>

<Txt
  {text}
  fontSize={12}
  fontFamily="Courier New"
  align="left"
  baseline="top"
  x={20}
  y={$height - 20}
/>

{@render children?.()}
