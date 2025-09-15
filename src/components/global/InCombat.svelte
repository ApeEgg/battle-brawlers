<script lang="ts">
  let loopId: any = $state();
  let startTimestamp = $state(0);
  let lastTimestamp = 0;

  const loop = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const deltaTime = timestamp - lastTimestamp;
    app.elapsedMilliseconds += deltaTime;
    lastTimestamp = timestamp;

    let [event] = app.combat.events;

    if (app.elapsedMilliseconds > event?.eventTimestamp) {
      app.liveTeams = event.teams;
      const [_, ...newEvents] = app.combat.events;
      app.combat.events = newEvents;
    }

    if (app.elapsedMilliseconds > app.combat.duration) {
      app.liveTeams = app.combat.teamsEndState;
      cancelAnimationFrame(loopId);
      loopId = undefined;

      app.characters.forEach((character) => {
        const myCharacter = app.liveTeams[0].combatants.find((c) => c.uuid === character.uuid);
        if (myCharacter) {
          character.overrides.combatStats.currentHealth = myCharacter.combatStats.currentHealth;
        }
      });
      return;
    }

    loopId = requestAnimationFrame(loop);
  };

  const pauseCombat = () => {
    cancelAnimationFrame(loopId);
    loopId = undefined;
  };

  const resumeCombat = () => {
    lastTimestamp = 0;
    loopId = requestAnimationFrame(loop);
  };

  const startCombat = () => {
    lastTimestamp = 0;
    loopId = requestAnimationFrame(loop);
    startTimestamp = 0;
    app.elapsedMilliseconds = 0;
  };

  $effect(() => {
    if (app.combat.duration > 0) {
      startCombat();
    }

    document.addEventListener('pauseCombat', pauseCombat);
    document.addEventListener('resumeCombat', resumeCombat);

    return () => {
      document.removeEventListener('pauseCombat', pauseCombat);
      document.removeEventListener('resumeCombat', resumeCombat);
    };
  });
</script>
