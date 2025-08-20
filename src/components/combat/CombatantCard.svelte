<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import EnergyBar from '$src/components/combat/EnergyBar.svelte';
  let { id, race, name, combatStats, abilities } = $props();
</script>

<div class="combatant">
  <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth} />
  <div class="card">
    {name} <br />
    <strong>Race:</strong>
    {race} <br />
    <strong>Damage:</strong>
    {combatStats.damage} <br />
    <strong>ID:</strong><br />
    <span class="text-xs">{id}</span>
  </div>
  <EnergyBar current={combatStats.currentEnergy} max={combatStats.maxEnergy} />
  <div class="abilities divide-x divide-gray-300 border border-gray-300">
    {#each abilities as { prettyName, ticks }}
      <div class="w-{ticks}/12 text-center">
        <!-- {prettyName}<br /> -->
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
    background: #fff;
  }
  .card {
    width: 140px;
    aspect-ratio: 1/1.2;
    background: #fafafa;
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

    font-size: 8px;
    /* padding: 4px 8px; */
  }
</style>
