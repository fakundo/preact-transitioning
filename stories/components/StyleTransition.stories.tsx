// @ts-nocheck
import { Meta, StoryObj } from '@storybook/preact';
import { StyleTransition } from 'preact-transitioning';
import { description, argTypes } from 'docgen/StyleTransition.json';

const DURATION = 500;

const META: Meta<typeof StyleTransition> = {
  title: 'Components/StyleTransition',
  component: StyleTransition,
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
    alwaysMounted: true,
    duration: DURATION,
    styles: {
      appear: { opacity: 0 },
      appearActive: { opacity: 1, transition: `opacity ${DURATION}ms` },
      enter: { opacity: 0 },
      enterActive: { opacity: 1, transition: `opacity ${DURATION}ms` },
      exit: { opacity: 1 },
      exitActive: { opacity: 0, transition: `opacity ${DURATION}ms` },
      exitDone: { opacity: 0 },
    },
  },
};

export default META;

export const Playground: StoryObj<typeof META> = {
  render: args => (
    <StyleTransition {...args}>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '15%',
          background: 'linear-gradient(to bottom right, seagreen, teal)',
        }}
      />
    </StyleTransition>
  ),
};
