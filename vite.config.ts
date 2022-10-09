import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  let base = '/';
  let generateScopedName = '[local]--[hash:base64:5]';

  if (isProduction) {
    base = '/calorie-calculator/';
    generateScopedName = '[hash:base64:5]';
  }

  return {
    base,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            nodeTransforms: isProduction ? [removeDataTestAttrs] : [],
          },
        },
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

/* eslint-disable @typescript-eslint/no-explicit-any*/
function removeDataTestAttrs(node: any) {
  if (node.type === 1 /* NodeTypes.ELEMENT */) {
    node.props = node.props.filter((prop: any) =>
      prop.type === 6 /* NodeTypes.ATTRIBUTE */ ? prop.name !== 'data-test' : true,
    );
  }
}
