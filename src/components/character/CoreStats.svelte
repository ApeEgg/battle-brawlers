<script lang="ts">
  import type { CombatStats } from '$src/types/combatStats';

  let {
    combatStats,
    small = false
  }: {
    combatStats: CombatStats;
    small?: boolean;
  } = $props();
</script>

<crow
  class={tw('!flex-none translate-y-px gap-2 text-xl text-gray-600', small && 'gap-1 text-sm')}
  left
>
  <crow class={tw('gap-1')}>
    <Icon name="maxHealth" original />
    {combatStats?.maxHealth}
  </crow>
  <span class="text-gray-300">/</span>
  <crow class={tw('gap-1')}>
    <Icon name="maxArmor" original />
    {combatStats?.maxArmor}
  </crow>
  <span class="text-gray-300">/</span>
  <crow class={tw('gap-1')}>
    <Icon name="damage" original />
    {combatStats?.damage}
  </crow>
</crow>
