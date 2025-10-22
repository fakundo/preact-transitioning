import { StorybookConfig } from '@storybook/preact-vite';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-controls', '@storybook/addon-actions', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/preact-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
    disableWhatsNewNotifications: true,
  },
  viteFinal: async config => {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, { plugins: [tsconfigPathsPlugin()] });
  },
};

export default config;
