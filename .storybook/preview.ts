import type { Preview } from '@storybook/vue3-vite'

import { setup } from '@storybook/vue3-vite'

import './preview.css'

import '@/app.css'

import {
  installStorybookQueryClient,
  resetStorybookQueryClient,
} from './query-client.ts'
import { installStorybookRouter, resetStorybookRouter } from './router.ts'

setup((app) => {
  installStorybookQueryClient(app)
  installStorybookRouter(app)
})

const preview: Preview = {
  decorators: [
    (story) => {
      document.documentElement.classList.add('dark')

      return {
        components: { story },
        template: `
          <div class="min-h-screen w-full bg-zinc-950">
            <story />
          </div>
          <div id="drawer-root"></div>
        `,
      }
    },
  ],
  loaders: [
    async () => {
      resetStorybookQueryClient()
      await resetStorybookRouter()
      return {}
    },
  ],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
