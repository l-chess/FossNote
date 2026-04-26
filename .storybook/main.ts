import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/renderer/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
  const { mergeConfig } = await import('vite')
  const tailwindcss = (await import('@tailwindcss/vite')).default

  return mergeConfig(config, {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      force: true,
    },
  })
},
};

export default config;