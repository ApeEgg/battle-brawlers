<script lang="ts">
  import { renderable } from '$svelte-game-engine';
  import type { Snippet } from 'svelte';

  let {
    color = 'hsl(0, 0%, 100%)',
    align = 'center',
    baseline = 'middle',
    text = '',
    x = 0,
    y = 0,
    fontSize = 16,
    fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
    children
  }: {
    color?: string;
    align?: string;
    baseline?: string;
    text?: string;
    x?: number;
    y?: number;
    fontSize?: number;
    fontFamily?: string;
    children?: Snippet;
  } = $props();

  renderable(({ ctx }: any) => {
    if (text) {
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = align;
      ctx.textBaseline = baseline;
      ctx.fillText(text, x, y);
    }
  });
</script>

{@render children?.()}
