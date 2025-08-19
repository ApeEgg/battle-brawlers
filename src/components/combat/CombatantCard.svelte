<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  import EnergyBar from '$src/components/combat/EnergyBar.svelte';
  let { id, race, combatStats, actions } = $props();
</script>

<div class="combatant">
  <HealthBar current={combatStats.currentHealth} max={combatStats.maxHealth} />
  <div class="card">
    <strong>Race:</strong>
    {race} <br />
    <strong>Damage:</strong>
    {combatStats.damage} <br />
    <strong>ID:</strong><br />
    <span class="text-xs">{id}</span>
  </div>
  <EnergyBar current={combatStats.currentEnergy} max={combatStats.maxEnergy} />
  <div class="actions">
    {#each actions as action}
      <div class="text-center">
        {action}<br />
        8
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
  .actions {
    display: flex;
    right: 4px;
    bottom: 4px;
    gap: 4px;
  }
  .actions > div {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    font-size: 8px;
    border: 1px dashed lightblue;
    padding: 4px 8px;
  }
</style>
