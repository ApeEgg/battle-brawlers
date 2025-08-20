<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import EnergyBar from '$src/components/combat/EnergyBar.svelte';
  import type { Combatant } from '$src/types/combatant';
  import type { Snippet } from 'svelte';

  let props: Combatant & {
    children: Snippet;
    facingRight: boolean;
    elapsedMilliseconds: number;
  } = $props();

  let { facingRight, children, race, name } = props;

  let combatStats = $derived(props.combatStats);
  let animations = $derived(props.animations);
  let elapsedMilliseconds = $derived(props.elapsedMilliseconds);
</script>

<div class="combatant bg-[#DACDBF]">
  <crow class="w-full justify-between px-2 py-1">
    <!-- <code class="text-xs">
      <pre>
        
    {JSON.stringify(animations, null, 2)}

      </pre>
    </code> -->
    {name}
    <crow right class="gap-1">
      <strong>DMG</strong>
      {combatStats.damage}
    </crow>
  </crow>
  <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth} />
  <div
    class="card relative"
    class:attack={animations.some(
      ({ animation, abilityName }) =>
        animation.start < elapsedMilliseconds &&
        animation.end > elapsedMilliseconds &&
        abilityName === 'basicAttackRegular'
    )}
    style="
      --attack-start-x: {facingRight ? -25 : 25}px;
      --attack-end-x: {facingRight ? 5 : -5}px;
      --attack-start-y: 0px;
      --attack-end-y: 0px;
    "
  >
    <div
      class={tw(
        'absolute inset-1 bg-contain bg-center bg-no-repeat',
        facingRight && 'scale-x-[-1]'
      )}
      style="background-image: url('/images/races/{race}/01.png')"
    ></div>
    <div class="relative">
      <!-- <strong>Race:</strong>
      {race} <br /> -->
    </div>
  </div>
  <!-- <EnergyBar current={combatStats.currentEnergy} max={combatStats.maxEnergy} /> -->
  {@render children()}
</div>

<style>
  .combatant {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
  .card {
    width: 140px;
    aspect-ratio: 1/1.2;
    padding: 12px;
  }
  .attack {
    animation: attack 500ms cubic-bezier(0.02, 1.35, 0.53, 1);
  }
  @keyframes attack {
    0% {
      transform: translate(0px, 0px);
    }
    65% {
      transform: translate(var(--attack-start-x), var(--attack-start-y));
    }
    100% {
      transform: translate(var(--attack-end-x), var(--attack-end-y));
    }
  }
</style>
