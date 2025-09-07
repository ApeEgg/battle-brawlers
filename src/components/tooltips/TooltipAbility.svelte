<script lang="ts">
  import { calculateCombatStatsByCharacter } from '$src/ts/Utils';
  import { AbilityType, type Ability } from '$src/types/ability';

  // let { prettyName, ticks, chainLink, description }: Ability = app.tooltip.props;
  let { prettyName, ticks, type, description, chainLink, damageCalc }: Ability = $derived(
    app.tooltip.props
  );

  let combatStats = $derived(calculateCombatStatsByCharacter(app.characters[0]));
  let damage = $derived(damageCalc({ ticks }));
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
    <div class="text-sm">
      <strong class="text-black"> Damage: </strong>
      {Math.ceil(combatStats.damage * damage.result)}
      ({damage.baseDamage.toFixed(2) * 100}% + {damage.addedDamage.toFixed(2) * 100}% of damage)
    </div>
  </crow>
  {#if description}
    <div class="mt-2 text-sm">{@html description}</div>
  {/if}
</div>
