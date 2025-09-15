<script>
  import customEvent from '$src/ts/customEvent';
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
      Server timestamp: {app.serverTimestamp} ({new Date(app.serverTimestamp).toLocaleString()})
    </div>
    <div>
      Client timestamp: {app.clientTimestamp} ({new Date(app.clientTimestamp).toLocaleString()})
    </div>
    <div>
      Diff: {app.clientTimestamp - app.serverTimestamp} ms
    </div>
  </crow>
  <crow left class="p-2">3</crow>
  <crow left class="p-2">4</crow>
</crow>
