<script lang="ts">
  import icons from '$src/iconice-icons.json';

  let { outcome }: { outcome: 'victory' | 'defeat' } = $props();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="${icons[outcome].viewBoxLeft} ${icons[outcome].viewBoxTop} ${icons[outcome].viewBoxWidth} ${icons[outcome].viewBoxHeight}">
      <g fill="#fff" stroke="none">
        ${icons[outcome].elements.join('')}
      </g>
    </svg>`.trim();

  const svgUrl = `"data:image/svg+xml,${encodeURIComponent(svg)}"`;
</script>

<crow class="relative !grid w-full place-items-center text-6xl">
  <div class="[grid-area:1/1]">
    <Icon name={outcome} class="text-9xl text-gray-400 drop-shadow-sm" />
  </div>
  <div
    class={tw(
      '[grid-area:1/1]',
      outcome === 'victory' &&
        '[background:radial-gradient(ellipse_farthest-corner_at_right_bottom,_#FEDB37_0%,_#FDB931_8%,_#9f7928_30%,_#8A6E2F_40%,_transparent_80%),_radial-gradient(ellipse_farthest-corner_at_left_top,_#FFFFFF_0%,_#FFFFAC_8%,_#D1B464_25%,_#5d4a1f_62.5%,_#5d4a1f_100%)]'
    )}
    style="
      -webkit-mask: url({svgUrl}) no-repeat bottom/auto 100%;
      mask: url{svgUrl}) no-repeat bottom/auto 100%;
    "
  >
    <!-- JUST FOR SIZE, DOESN'T RENDER -->
    <Icon name={outcome} class="text-9xl text-yellow-400 opacity-0 drop-shadow-lg" />
  </div>
  <div
    class={tw(
      'bree-serif drop-shadow-md  [grid-area:1/1]',
      outcome === 'victory'
        ? 'text-yellow-100 [-webkit-text-stroke:_1px_theme(color.yellow.300)]'
        : 'text-gray-100 [-webkit-text-stroke:_1px_theme(color.gray.300)]'
    )}
  >
    {outcome.toUpperCase()}
  </div>
</crow>
