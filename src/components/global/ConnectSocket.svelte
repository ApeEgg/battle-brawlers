<script lang="ts">
  import type { AsyncAwaitWebsocket } from 'async-await-websockets';
  import aaw from 'async-await-websockets/client';
  import { browser } from '$app/environment';

  const { WEBSOCKET_CONNECT } = ENV;
  const { notify } = ACTIONS;

  type AsyncWebsocketWithEvents = AsyncAwaitWebsocket & {
    on: (event: string, callback: (detail: any) => void) => void;
  };

  $effect(() => {
    if (browser && !app.socket) {
      const ws = aaw(WEBSOCKET_CONNECT) as AsyncWebsocketWithEvents;
      ws.on('broadcast', console.info);
      ws.on('open', () => {
        app.socket = ws;
        notify({ success: 'Connected to game server' });
      });
      ws.on('close', () => {
        notify({ error: `Can't connect to game server` });
      });
    }
  });
</script>
