<script lang="ts">
  import { AbilityType, type Ability } from '$src/types/ability';

  // let { prettyName, ticks, chainLink, description }: Ability = app.tooltip.props;
  let { prettyName, ticks, type, description, chainLink }: Ability = $derived(app.tooltip.props);
</script>

<div
  class="pointer-events-none w-60 gap-1 rounded-md px-2.5 pt-1.5 pb-3 text-sm leading-[18px] text-gray-700 shadow-sm"
>
  <crow class="w-full !justify-between">
    <strong class="text-lg text-black">{prettyName}</strong>
  </crow>
  <crow vertical left>
    <div class="text-sm">
      <strong class="text-black">
        {type === AbilityType.Channeling ? 'Duration' : 'Wind up'}:
      </strong>
      {ticks} tick{ticks === 1 ? '' : 's'}
    </div>
    {#if chainLink}
      <div class="text-sm">
        <strong>Triggers each:</strong>
        {ticks / chainLink} tick{ticks / chainLink === 1 ? '' : 's'}
      </div>
    {/if}
  </crow>
  {#if description}
    <div class="mt-2 text-sm">{@html description}</div>
  {/if}
</div>
