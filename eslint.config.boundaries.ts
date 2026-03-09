import type { Linter } from 'eslint'

const boundaries: Linter.FlatConfig[] = [
  {
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/**',
                '@/features/**',
                '@/infra/**',
                '@/lib',
                '@/lib/**',
                '@/shared/**',
                '@/ui/**',
                'vue',
                'vue-router',
                '@tanstack/**',
              ],
              message:
                'Domain must stay pure: no feature actions, infra, UI, shared helpers, or framework libraries.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              allowTypeImports: true,
              name: '@/shared/result',
            },
          ],
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/infra/**', '@/lib', '@/lib/**', '@/ui/**', 'vue', 'vue-router', '@tanstack/**'],
              message:
                'Feature actions must stay as contracts over domain types: no infra, UI, or framework libraries.',
            },
            {
              group: ['@/features/**'],
              importNamePattern: '^(?!.*)$',
              message:
                'Feature files may depend on other features only through explicit type-only action contracts.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/infra/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/ui/**', 'vue', 'vue-router'],
              message:
                'Infra layer must not depend on app/router/UI/framework view code.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/ui/query-hooks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/infra/**', '@/ui/router/**'],
              message:
                'UI query-hooks must not import app/router/infra. Accept feature actions as input and adapt them to Vue Query.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/ui/pages/**/*.{vue,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**'],
              message: 'UI pages must not import app.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/**',
                '@/features/**',
                '@/infra/**',
                '@/ui/**',
                'vue',
                'vue-router',
                '@tanstack/**',
              ],
              message:
                'Shared layer must stay framework-agnostic and independent from app/features/infra/ui.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/lib/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/features/**', '@/infra/**'],
              message:
                'Lib layer must not depend on app/features/infra. Keep it as local helpers only.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/ui/router/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/features/**', '@/infra/**'],
              message:
                'Router must not depend on app/features/infra. Keep it as UI wiring only.',
            },
          ],
        },
      ],
    },
  },
]

export default boundaries
