<script lang="ts">
  import HealthBar from '$src/components/combat/HealthBar.svelte';
  let { name, race, combatStats, actions } = $props();
</script>

<div class="combatant">
  <HealthBar currentHealth={combatStats.currentHealth} maxHealth={combatStats.maxHealth} />
  <div class="card">
    <strong>Race:</strong>
    {race} <br />
    <strong>Health:</strong>
    {combatStats.currentHealth} / {combatStats.maxHealth} <br />
    <strong>Damage:</strong>
    {combatStats.damage}
  </div>
  <div class="actions">
    {#each actions as action}
      <div>
        {action}
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
    width: 20%;
    font-size: 8px;
    border: 1px dashed lightblue;
    padding: 4px 8px;
  }
</style>
