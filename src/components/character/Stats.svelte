<script lang="ts">
  import { prettyCombatStatKey, prettyCombatStatValue } from '$src/types/combatStats';

  let { stats, class: classes }: { stats: any; class?: string } = $props();
</script>

{#each stats as [key, value]}
  {@const actualKey =
    {
      wounded: 'bleeding',
      concussed: 'stunned',
      exposed: 'vulnerable'
    }?.[key as string] || key}
  {@const actualValue = prettyCombatStatValue(actualKey, value)}
  <crow class="w-full !justify-between">
    <crow left class="gap-1">
      <crow class="w-5 !flex-none">
        <Icon name={actualKey} original class="text-lg" />
      </crow>
      {prettyCombatStatKey(actualKey)}
    </crow>
    <div class={tw(actualValue !== '-' && classes)}>
      {actualValue}
    </div>
  </crow>
{/each}
