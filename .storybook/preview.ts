import type { Preview } from '@storybook/preact';
import theme from './theme';
import './preview.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
    darkMode: {
      current: 'dark',
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Examples',
          ['Basic Transition', 'Fade Transition', ['Inline Styles']],
          'Components',
          ['Transition', 'StyleTransition', 'CSSTransition'],
        ],
      },
    },
  },
};

export default preview;
