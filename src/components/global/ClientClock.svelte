<script lang="ts">
  let interval = setInterval(() => {});

  $effect(() => {
    interval = setInterval(() => {
      app.clientTimestamp = Date.now();
    }, 1000);

    return () => clearInterval(interval);
  });
</script>
