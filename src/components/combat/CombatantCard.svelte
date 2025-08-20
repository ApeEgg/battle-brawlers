<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import EnergyBar from '$src/components/combat/EnergyBar.svelte';
  let { id, race, name, combatStats, abilities, facingRight } = $props();
</script>

<div class="combatant bg-[#DACDBF]">
  <crow class="w-full justify-between px-2 py-1">
    {name}
    <crow right class="gap-1">
      <strong>DMG</strong>
      {combatStats.damage}
    </crow>
  </crow>
  <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth} />
  <div class="card relative">
    <div
      class={tw('absolute inset-0 bg-cover', facingRight && 'scale-x-[-1]')}
      style="background-image: url('/images/races/{race}/01.png')"
    ></div>
    <div class="relative">
      <strong>Race:</strong>
      {race} <br />

      <!-- <strong>ID:</strong><br />
      <span class="text-xs">{id}</span> -->
    </div>
  </div>
  <!-- <EnergyBar current={combatStats.currentEnergy} max={combatStats.maxEnergy} /> -->
  <div class="abilities divide-x divide-gray-600 border border-gray-600">
    {#each abilities as { prettyName, ticks, icon }}
      <div class="w-{ticks}/12 relative text-center">
        {#if icon === '1h1h'}
          <div
            class="absolute top-0 bottom-0 left-1/2 w-[0.1px] -translate-x-1/2 bg-gray-400"
          ></div>
        {/if}
        <Icon class="relative" name={icon} />
      </div>
    {/each}
  </div>
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
  .abilities {
    display: flex;
    right: 4px;
    bottom: 4px;
  }
  .abilities > div {
    display: flex;
    flex: 1;
    height: 24px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    /* padding: 4px 8px; */
  }
</style>
