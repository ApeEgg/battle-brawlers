import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-svelte-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  build: {
    sourcemap: true
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    tailwindcss(),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: [
        {
          '$src/app.svelte': [['default', 'app']]
        },
        {
          svelte: ['onMount', 'onDestroy']
        },
        {
          'tailwind-merge': [['twMerge', 'tw']]
        },
        {
          '$src/store': ['ACTIONS', 'STORES']
        },
        {
          '$src/constants/ENV_VARS': [['default', 'ENV']]
        },
        {
          '$src/ts/use': ['tooltip']
        }
      ]
    }),
    Components({
      dirs: ['./src/components'],
      dts: './src/components.d.ts'
    }),
    // autoImport({
    //   components: [{ name: './src/components', flat: true }],
    //   mapping: {
    //     ENV: `import ENV from '$src/constants/ENV_VARS'`,
    //     app: `import app from '$src/app.svelte'`
    //   },
    //   module: {
    //     svelte: ['onMount', 'onDestroy'],
    //     '$src/store': ['STORES', 'ACTIONS'],
    //     '$src/ts/use': ['tooltip'],
    //     'tailwind-merge': ['twMerge as tw']
    //   },
    //   include: ['**/*.svelte']
    // }),
    sveltekit()
  ]
});
