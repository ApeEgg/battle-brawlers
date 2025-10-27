<script lang="ts">
  import { renderable } from '$svelte-game-engine';

  let { color } = $props();

  renderable(({ ctx, width, height }: any) => {
    ctx.clearRect(0, 0, width, height);
    if (color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }
  });
</script>
