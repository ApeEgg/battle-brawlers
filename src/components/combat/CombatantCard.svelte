<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import type { Combatant } from '$src/types/combatant';
  import CombatantAbilityBar from '$src/components/combat/CombatantAbilityBar.svelte';
  import CombatantImage from '$src/components/combat/CombatantImage.svelte';
  import STATUS_EFFECTS from '$src/constants/STATUS_EFFECTS';
  import { flip } from 'svelte/animate';

  let props: Combatant & {
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
    scale: number;
  } = $props();

  let { name, id } = props;

  let combatStats = $derived(props.combatStats);
  let damage = $derived(props.damage);

  let position = $derived(props.position);
  let z = $derived(props.z);
  let x = $derived(position.x);
  let y = $derived(position.y);
  let scale = $derived(props.scale);
  let statuses = $derived(props.statuses);
  let facingRight = $derived(props.facingRight);
  let currentArmor = $derived(combatStats.currentArmor);
  // let currentAbility = $derived(props.abilities.find);
</script>

<div
  class="absolute top-1/2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
  style="z-index:{z};"
>
  <div class="absolute" style="left: {x}px; top:{y}px; transform: translate(-50%, -50%);">
    <div class="absolute" style="transform: scale(1) translate(-50%, -50%);">
      <div class="combatant rounded border-[0.5px] bg-[#D7CEC1] shadow">
        <crow class="w-full justify-between px-2 py-1 font-bold text-[#b3ad9f] uppercase">
          {name}
          <!-- <crow right class="gap-1">
            <strong>DMG</strong>
            {damage}
          </crow> -->
        </crow>

        <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth}></HealthBar>
        <div class="h-40 w-36"></div>
        <CombatantAbilityBar {...props} />

        <crow
          vertical
          class={tw(
            'absolute top-17 left-[calc(100%-theme(spacing.5))] gap-2',
            facingRight ? 'right right-[calc(100%-theme(spacing.5))] left-auto' : 'left'
          )}
        >
          {#each Object.entries(statuses)
            .filter(([_, { ticks }]) => ticks)
            .sort(([a], [b]) => a.ticks - b.ticks) as [key, { ticks }] (key)}
            {@const effect = STATUS_EFFECTS?.[key]}
            <crow class="gap-2" animate:flip={{ duration: 250 }}>
              <crow class={tw('w-5', facingRight && 'order-1')}>
                <Icon
                  name={effect.icon}
                  class="{effect.animation} [animation-direction:reverse]"
                  original
                />
              </crow>
              <span class="text-xs">{effect.text}&nbsp;{ticks}</span>
            </crow>
          {/each}
        </crow>

        <crow
          class={tw(
            'absolute bottom-6 left-0 aspect-square w-10',
            facingRight ? 'right-0 left-auto' : ''
          )}
        >
          <Icon name="1h1h" class="text-3xl text-[#b3ad9f]" />
          {#if damage > 0}
            <crow
              class="alfa-slab-one absolute inset-0 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              {damage}
            </crow>
          {/if}
        </crow>
        <crow
          class={tw(
            'absolute right-0 bottom-6 aspect-square w-10',
            facingRight ? 'right-auto left-0' : ''
          )}
        >
          <Icon name="armor" class="text-3xl text-[#b3ad9f]" />
          {#if currentArmor > 0}
            <crow
              class="alfa-slab-one absolute inset-0 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              {currentArmor}
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
