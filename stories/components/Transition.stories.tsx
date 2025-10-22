import { Meta, StoryObj } from '@storybook/preact';
import { fn } from '@storybook/test';
import { Transition } from 'preact-transitioning';
import { description, argTypes } from 'docgen/Transition.json';

const META: Meta<typeof Transition> = {
  title: 'Components/Transition',
  component: Transition,
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
    onEnter: fn(),
    onEntering: fn(),
    onEntered: fn(),
    onExit: fn(),
    onExiting: fn(),
    onExited: fn(),
  },
};

export default META;

export const Playground: StoryObj<typeof META> = {
  render: args => (
    <Transition {...args}>
      {transitionState => <pre>{JSON.stringify(transitionState, null, '  ')}</pre>}
    </Transition>
  ),
};
