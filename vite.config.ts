/// <reference types="vitest" />
import process from 'node:process'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { uniPolyfill } from './uni-polyfill'

/** @see https://vitejs.dev/config/ */
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  // eslint-disable-next-line no-console
  console.log('运行环境 :', process.env.NODE_ENV)

  return defineConfig({
    plugins: [
      /** @see https://github.com/uni-helper/vite-plugin-uni-manifest */
      UniHelperManifest(),
      /** @see https://github.com/uni-helper/vite-plugin-uni-pages */
      UniHelperPages({
        dts: 'src/router/uni-pages.d.ts',
        exclude: ['**/components/**'],
        subPackages: ['src/pages-my'],
      }),
      /** @see https://github.com/uni-helper/vite-plugin-uni-layouts */
      UniHelperLayouts(),
      /** @see https://github.com/uni-helper/vite-plugin-uni-components */
      UniHelperComponents({
        resolvers: [WotResolver()],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
      }),
      Uni(),
      /** @see https://github.com/antfu/unplugin-auto-import */
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app', 'pinia', {
          from: 'uni-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute'],
        }, {
          from: 'wot-design-uni',
          imports: ['useMessage', 'useToast'],
        }, {
          from: 'wot-design-uni/components/wd-picker-view/types',
          imports: ['ColumnItem'],
          type: true,
        }, {
          from: 'wot-design-uni/components/wd-form/wd-form.vue',
          imports: ['WdForm', 'FormItemRule'],
          type: true,
        }],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/services/**'],
        vueTemplate: true,
      }),
      /**
       * unocss.config.ts for config
       * @see  https://github.com/antfu/unocss
       */
      UnoCSS(),
      uniPolyfill(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    server: {
      open: false,
      port: 5173,
      // proxy: {
      //   '/api': {
      //     target: 'https://api.github.com',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    // build: {
    //   // 开发阶段启用源码映射
    //   sourcemap: process.env.NODE_ENV === 'development',
    // },
    /** Vitest @see https://github.com/vitest-dev/vitest */
    test: {
      environment: 'jsdom',
      setupFiles: [resolve(__dirname, './test/setupTests.ts')],
    },
  })
}
