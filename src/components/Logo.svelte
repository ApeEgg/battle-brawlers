<script lang="ts">
  import { recursiveLookup } from '$src/helpers';
  const { showTooltip, hideTooltip } = ACTIONS;
</script>

<a
  href="/"
  class="fixed top-3 left-3 block"
  on:mouseenter={showTooltip.bind(undefined, 'Info', 'right')}
  on:mouseleave={({ toElement }: any) =>
    !recursiveLookup(toElement, ['mouse-tracker']) && hideTooltip()}
>
  <Icon class="text-black dark:text-white text-7xl" name="logo-apeegg" />
</a>
