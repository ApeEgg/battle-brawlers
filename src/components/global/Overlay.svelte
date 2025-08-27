<script lang="ts">
  import { recursiveLookup, camelCaseToDashed } from '$src/helpers';
  import type { ClickEvent } from '$src/types/common';

  const { overlay, keys } = STORES;
  const { setOverlay } = ACTIONS;
  const close = ({ target }: ClickEvent) => recursiveLookup(target, ['close']) && setOverlay('');
  const closeSelf = ({ target }: ClickEvent) =>
    target.classList.contains('overlay') && setOverlay('');

  $: ({ escape } = $keys);
  $: escape && setOverlay($overlay ? '' : 'GameMenu');
  $: isGameMenu = camelCaseToDashed($overlay) === 'game-menu';
</script>

<button
  onclick={closeSelf}
  class={tw(
    'xs:grid-rows-[theme(spacing.8)_1fr_theme(spacing.8)] overlay pointer-events-none fixed inset-[0_0_auto_0] z-20 grid h-full scale-95 grid-rows-[theme(spacing.20)_1fr_theme(spacing.20)] place-items-center overflow-x-hidden overflow-y-auto border-0 bg-white/80 opacity-0 transition-[opacity,transform] duration-0 outline-none',
    $overlay && 'pointer-events-auto scale-100 opacity-100 delay-75 duration-200'
  )}
>
  <div></div>
  <div
    class={tw(
      'xs:min-w-[calc(100%-theme(spacing.20))] xs:max-w-[calc(100%-theme(spacing.8))] relative max-w-[calc(100%-theme(spacing.24))] min-w-[43.75rem] text-left',
      isGameMenu && 'min-w-[theme(spacing.80)]'
    )}
  >
    {#if $overlay}
      <Async component={`./overlays/${$overlay}.svelte`} onclick={close} />
    {/if}
  </div>
  <div></div>
</button>
