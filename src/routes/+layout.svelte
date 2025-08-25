<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import '../crow.css';
  import '$src/store/settings';
  import type { Snippet } from 'svelte';
  import Authorization from '$src/components/Authorization.svelte';
  const { token } = STORES;

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !$token);
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'bg-blur min-h-screen w-screen bg-cover bg-center bg-no-repeat',
    isFrontpage
      ? 'row bg-[url("/images/desktop-1920x1080.jpg")]'
      : 'row-up bg-[url("/images/parchment-bg-2250x1500.jpg")] dark:bg-gray-800'
  )}
>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))]',
      isFrontpage ? 'row' : 'row-up-left w-full max-w-7xl'
    )}
  >
    <Authorization>
      <Row class="min-h-screen flex-1 gap-2 pt-20" up>
        <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
          <h4>Your mini fighters</h4>
          <div class="mt-4">
            <crow vertical up left>
              {#each app.characters as character}
                <crow class="w-full gap-2 bg-gray-100/50" left>
                  <div class="h-6 w-6 overflow-hidden bg-white">
                    <img src="/images/races/{character.race}/01.png" alt="" />
                  </div>
                  <div class="p-2">{character.race}</div>
                </crow>
              {/each}
            </crow>
          </div>
        </div>
        <div class="h-full flex-1 rounded border border-gray-400 bg-white p-4">
          <div>
            {@render children()}
          </div>
        </div>
        <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
          <crow up left vertical>
            <a href="/">Start</a>
            <a href="/creatures">Creatures</a>
            <a href="/debug">Debug</a>
          </crow>
          <!-- <code class="text-xs">
      <pre>
      {JSON.stringify(teams, null, 2)}
    </pre>
    </code> -->
        </div>
      </Row>
    </Authorization>
  </div>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
