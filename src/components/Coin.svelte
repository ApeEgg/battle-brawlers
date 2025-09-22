<script lang="ts">
  let { type, class: classes }: { type: 'copper' | 'silver' | 'gold'; class?: string } = $props();
</script>

<div
  class={tw(
    'inline-block !w-auto !flex-none rounded-full border-[0.5px] bg-white shadow-[0.5px_0.5px_0_rgba(0,0,0,0.5)]',
    type === 'copper' && 'border-amber-700',
    type === 'silver' && 'border-cyan-600',
    type === 'gold' && 'border-yellow-600',
    classes
  )}
>
  <Icon
    name="coin"
    class={tw(
      'text-lg text-yellow-400',
      type === 'copper' && 'text-amber-600',
      type === 'silver' && 'text-cyan-500',
      type === 'gold' && 'text-yellow-500'
    )}
  />
</div>
