<script lang="ts">
  import { renderable, width, height } from '$svelte-game-engine';
  import vec2 from 'gl-vec2';
  import type { Snippet } from 'svelte';

  let {
    color = '#ffe554',
    size = 10,
    thickness = 3,
    startX = $width / 2,
    startY = $height / 2,
    moveSpeed = 0.2,
    maxVelocity = 5,
    children
  } = $props<{ children: Snippet }>();

  let text: string;

  let x = startX;
  let y = startY;
  const velocity = [0, 0];

  let mouse: null | [number, number] = null;
  let mouseDown = false;

  renderable(({ ctx, width, height }: any) => {
    let position = [x, y];
    if (mouseDown) {
      const delta = vec2.sub([], mouse, position);
      const len = vec2.length(delta);
      if (len > size * 2) {
        vec2.normalize(delta, delta);
        vec2.scaleAndAdd(velocity, velocity, delta, moveSpeed);
      }
    }

    if (x < 0 || x > width) {
      x = Math.max(0, Math.min(width, x));
      velocity[0] *= -1;
    }
    if (y < 0 || y > height) {
      y = Math.max(0, Math.min(height, y));
      velocity[1] *= -1;
    }
    velocity[0] = Math.max(-maxVelocity, Math.min(maxVelocity, velocity[0]));
    velocity[1] = Math.max(-maxVelocity, Math.min(maxVelocity, velocity[1]));
    velocity[0] *= 0.98;
    velocity[1] *= 0.98;
    x += velocity[0];
    y += velocity[1];

    position[0] = x;
    position[1] = y;

    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();

    if (vec2.squaredLength(velocity) > 0) {
      const normal = vec2.normalize([], velocity);
      ctx.lineWidth = thickness;
      drawNormal(ctx, position, normal, size);
    }

    // We use this to make sure the text is in sync with the character
    // Because regular prop reactivity happens a frame too late

    // @ts-ignore
    text.$set({
      text: `(${position.map((n) => Math.round(n)).join(', ')})`,
      x,
      y: y + size + 10
    });
  });

  function drawNormal(ctx: any, position: number[], normal: any, length: number) {
    const point = vec2.scaleAndAdd([], position, normal, length);
    ctx.beginPath();
    ctx.moveTo(position[0], position[1]);
    ctx.lineTo(point[0], point[1]);
    ctx.stroke();
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    mouse = [clientX, clientY];
  }

  function handleMouseDown(ev: MouseEvent) {
    handleMouseMove(ev);
    mouseDown = true;
  }

  function handleMouseUp(ev: MouseEvent) {
    handleMouseMove(ev);
    mouseDown = false;
  }
</script>

<svelte:window
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
/>

<Txt fontSize={8} baseline="top" />

{@render children()}
