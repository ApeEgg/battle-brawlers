<script lang="ts">
  import { calculateCombatStatsByCharacter } from '$src/ts/Utils';
  import { AbilityType, type Ability } from '$src/types/ability';
  import type { Character } from '$src/types/character';

  // let { prettyName, ticks, chainLink, description }: Ability = app.tooltip.props;
  let {
    prettyName,
    ticks,
    type,
    description,
    chainLink,
    damageCalc,
    healingCalc,
    character
  }: Ability & { character: Character } = $derived(app.tooltip.props);

  let calculatedDamage = $derived(damageCalc({ ticks: chainLink ? ticks / chainLink : ticks }));
  let calculatedHealing = $derived(healingCalc({ ticks: chainLink ? ticks / chainLink : ticks }));
  let combatStats = $derived(character ? calculateCombatStatsByCharacter(character) : {});
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
    {#if calculatedDamage.result}
      <div class="text-sm">
        <strong class="text-black"> Damage: </strong>
        {Math.ceil(combatStats?.damage * calculatedDamage.result)}
        <!-- ({calculatedDamage.baseDamage.toFixed(2) * 100}% + {calculatedDamage.addedDamage.toFixed(2) *
        100}% of damage) -->
        ({Math.ceil(calculatedDamage.result * 100)}% of damage)
      </div>
    {/if}
    {#if calculatedHealing.result}
      <div class="text-sm">
        <strong class="text-black"> Heal: </strong>
        {Math.ceil(combatStats?.maxHealth * calculatedHealing.result)}
        <!-- ({calculatedHealing.baseDamage.toFixed(2) * 100}% + {calculatedHealing.addedDamage.toFixed(2) *
        100}% of damage) -->
        ({Math.ceil(calculatedHealing.result * 100)}% of health)
      </div>
    {/if}
  </crow>
  {#if description}
    <div class="mt-2 text-sm">{@html description}</div>
  {/if}
</div>
