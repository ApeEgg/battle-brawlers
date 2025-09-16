<script lang="ts">
  import { preventDefault } from '$src/helpers';
  import type { ChangeEvent } from '$src/types/common';

  const { keys, overlay, token } = STORES;
  const { lockKeys, unlockKeys, notify } = ACTIONS;
  const { IS_DEV, AUTO_EMAIL, AUTO_PASSWORD } = ENV;

  let email = $state(IS_DEV ? AUTO_EMAIL : '');
  let password = $state(IS_DEV ? AUTO_PASSWORD : '');
  let rememberMe = $state(IS_DEV ? true : false);
  let codeOfConduct = $state(IS_DEV ? true : false);

  const login = async () => {
    if (!codeOfConduct) {
      notify({
        error: 'you must to agree to the Code of Conduct in order to play'
      });
      return;
    }
    try {
      const t = await app.socket.sendAsync('user/login', {
        email,
        password
      });

      let expiration = '';
      if (rememberMe) {
        const future = new Date();
        future.setDate(future.getDate() + 30);
        expiration = ` Expires=${future};`;
      }
      document.cookie = `token=${t};${expiration}`;

      app.token = t;
      notify({ success: 'Logged in successfully' });
    } catch (error) {
      notify(error);
    }
  };

  const { escape } = $derived($keys);
</script>

<form class="column-left w-full gap-2" onsubmit={preventDefault(login)}>
  <crow class="w-full gap-2">
    <Input
      class="xs:w-full"
      placeholder="Email"
      type="email"
      on:focus={lockKeys}
      on:blur={unlockKeys}
      bind:value={email}
      blur={escape}
    />
    <Input
      class="xs:w-full"
      placeholder="Password"
      type="password"
      bind:value={password}
      on:focus={lockKeys}
      on:blur={unlockKeys}
      blur={escape}
    />

    <Button class="xs:w-full" primary type="submit" blur={escape}>Log&nbsp;in</Button>
  </crow>

  <Checkbox
    id="codeOfConduct"
    bind:value={codeOfConduct}
    onchange={({ target: { checked } }: ChangeEvent) => (codeOfConduct = checked)}
  >
    I agree to the <a
      class="text-blue-500 hover:underline"
      href="/"
      onclick={preventDefault(() => ($overlay = 'CodeOfConduct'))}
    >
      Code of Conduct
    </a>
  </Checkbox>

  <Checkbox
    id="rememberMe"
    bind:value={rememberMe}
    onchange={({ target: { checked } }: ChangeEvent) => (rememberMe = checked)}
  >
    Remember me
  </Checkbox>
</form>
