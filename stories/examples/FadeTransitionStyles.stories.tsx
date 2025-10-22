import { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { FadeTransition } from '../misc/StyleFadeTransition';

const META: Meta = {
  tags: ['!dev'],
};

export default META;

export const Default: StoryObj<typeof META> = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <button onClick={() => setVisible(!visible)} type="button">
          Toggle visibility
        </button>
        <hr />
        <FadeTransition in={visible} alwaysMounted>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '15%',
              background: 'linear-gradient(to bottom right, seagreen, teal)',
            }}
          />
        </FadeTransition>
      </>
    );
  },
};
