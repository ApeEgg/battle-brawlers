<script>
  import CHARACTERS from '$src/constants/CHARACTERS';
  import customEvent from '$src/ts/customEvent';
  import { calculateCombatStatsByCharacter } from '$src/ts/Utils';

  const healParty = () =>
    app.characters.forEach((character) => {
      const combatStats = calculateCombatStatsByCharacter(CHARACTERS(character, true));
      const maxHealth = combatStats.maxHealth ?? 0;
      const currentHealth = combatStats.currentHealth ?? maxHealth;
      const heal = Math.ceil(maxHealth * 0.33);
      character.overrides.combatStats.currentHealth = Math.min(currentHealth + heal, maxHealth);
    });

  const gain50Exp = () => (app.experience += 50);
</script>

<crow up class="sticky top-0 bg-gray-200">
  <crow vertical left class="gap-1 p-2">
    <Button onclick={customEvent.bind(undefined, 'pauseCombat', { nothing: 'true' })}>
      Pause combat
    </Button>
    <Button
      onclick={customEvent.bind(undefined, 'resumeCombat', { nothing: 'true' })}
      disabled={app.combat.duration === 0 || app.combat.duration <= app.elapsedMilliseconds}
    >
      Resume combat
    </Button>
    <div>
      Elapsed ms: {app.elapsedMilliseconds.toFixed(0)}
    </div>
    <div>
      Duration: {app.combat.duration}
    </div>
  </crow>
  <crow vertical left class="p-2">
    <div>
      Time sync (server): {new Date(app.serverTimestampSnapshot).toLocaleString()}
    </div>
    <div>
      Time (server): {new Date(app.serverTimestamp).toLocaleString()}
    </div>
  </crow>
  <crow vertical left class="gap-1 p-2">
    <Button
      onclick={() => {
        const character = app.characters[0];
        if (!character) return;
        const current = character.overrides.combatStats.currentHealth ?? 0;
        character.overrides.combatStats.currentHealth = current - 10;
      }}
    >
      Deal 10 damage to char[0]
    </Button>
    <Button onclick={healParty}>Heal party</Button>
    <crow class="gap-1">
      <Button onclick={gain50Exp}>Gain exp</Button>
      <Button onclick={() => (app.experience = 0)}>Reset exp</Button>
    </crow>
  </crow>
  <crow left class="p-2">4</crow>
</crow>
