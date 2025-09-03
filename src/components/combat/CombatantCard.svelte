<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import type { Combatant } from '$src/types/combatant';
  import CombatantAbilityBar from '$src/components/combat/CombatantAbilityBar.svelte';
  import CombatantImage from '$src/components/combat/CombatantImage.svelte';

  let props: Combatant & {
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
    scale: number;
  } = $props();

  let { name, id } = props;

  let combatStats = $derived(props.combatStats);
  let damage = $derived(combatStats.damage);

  let position = $derived(props.position);
  let z = $derived(props.z);
  let x = $derived(position.x);
  let y = $derived(position.y);
  let scale = $derived(props.scale);
  let statuses = $derived(props.statuses);
</script>

<div
  class="absolute top-1/2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
  style="z-index:{z};"
>
  <div class="absolute" style="left: {x}px; top:{y}px; transform: translate(-50%, -50%);">
    <div class="absolute" style="transform: scale(1) translate(-50%, -50%);">
      <div class="combatant rounded border bg-[#D7CEC1] shadow">
        <crow class="w-full justify-between px-2 py-1">
          {name}
          <crow right class="gap-1">
            <strong>DMG</strong>
            {damage}
          </crow>
        </crow>

        <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth}></HealthBar>
        <div class="h-40 w-36"></div>
        <CombatantAbilityBar {...props} />

        <crow vertical class="absolute top-16 left-[calc(100%-theme(spacing.5))] gap-2">
          {#if statuses.isStunned}
            <crow class="gap-3">
              <crow class="w-4">
                <Icon
                  name="isStunned"
                  class="animate-spin [animation-direction:reverse]"
                  original
                />
              </crow>
              <span class="text-xs">STUNNED</span>
            </crow>
          {/if}
          {#if statuses.isBleeding}
            <crow class="gap-3">
              <crow class="w-4">
                <Icon
                  name="isBleeding"
                  class="animate-bounce [animation-direction:reverse]"
                  original
                />
              </crow>
              <span class="text-xs">BLEEDING</span>
            </crow>
          {/if}
        </crow>
      </div>
    </div>
  </div>

  <CombatantImage {...props} />
</div>

<style>
  .combatant {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
</style>
