// @ts-nocheck
import { Meta, StoryObj } from '@storybook/preact';
import { CSSTransition } from 'preact-transitioning';
import './CSSTransition.stories.css';
import { description, argTypes } from 'docgen/CSSTransition.json';

const META: Meta<typeof CSSTransition> = {
  title: 'Components/CSSTransition',
  component: CSSTransition,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  argTypes,
  args: {
    in: true,
    appear: true,
    classNames: 'fade',
    alwaysMounted: true,
  },
};

export default META;

export const Playground: StoryObj<typeof META> = {
  render: args => (
    <CSSTransition {...args}>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '15%',
          background: 'linear-gradient(to bottom right, seagreen, teal)',
        }}
      />
    </CSSTransition>
  ),
};
