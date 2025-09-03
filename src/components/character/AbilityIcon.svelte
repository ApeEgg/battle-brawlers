<script lang="ts">
  import type { Ability } from '$src/types/ability';

  let {
    small,
    hideTickCount,
    ability
  }: { small?: boolean; hideTickCount?: boolean; ability: Ability } = $props();

  let { icon, ticks } = $derived(ability);
  let basicAttack = $derived(
    ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block', 'spin'].includes(
      ability.id
    )
  );
</script>

{#if !basicAttack}
  <Icon
    class={tw('absolute text-[300px] opacity-20', small && 'text-9xl', small)}
    name={icon}
    original
  />
  <!-- style="--{icon}--fill-color-0: #000;" -->
{/if}
{#if !hideTickCount}
  <crow right down class="ticks absolute inset-0">
    <div class={tw('p-1.5 text-3xl leading-5', small && 'p-0.5 text-lg leading-3.5')}>
      {ticks}
    </div>
  </crow>
{/if}
<Icon
  class={tw(
    'relative text-5xl',
    basicAttack && 'text-xl',
    small && 'text-2xl',
    small && basicAttack && 'text-xl'
  )}
  name={icon}
  original
/>
