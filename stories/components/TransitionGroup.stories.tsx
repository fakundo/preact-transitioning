import { Meta, StoryObj } from '@storybook/preact';
import { TransitionGroup } from 'preact-transitioning';
import { description, argTypes } from 'docgen/TransitionGroup.json';
import { FadeTransition } from '../misc/StyleFadeTransition';

const META: Meta<typeof TransitionGroup> = {
  title: 'Components/TransitionGroup',
  component: TransitionGroup,
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
    appear: true,
  },
};

export default META;

export const Playground: StoryObj<typeof META> = {
  render: args => (
    <div
      style={{
        display: 'flex',
        gap: '.25rem',
      }}
    >
      <TransitionGroup {...args}>
        <FadeTransition key="0">
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '15%',
              background: 'linear-gradient(to bottom right, seagreen, teal)',
            }}
          />
        </FadeTransition>
        <FadeTransition key="1">
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '15%',
              background: 'linear-gradient(to bottom right, blueviolet, cornflowerblue)',
            }}
          />
        </FadeTransition>
      </TransitionGroup>
    </div>
  ),
};
