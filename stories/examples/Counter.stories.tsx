import { Meta, StoryObj } from '@storybook/preact';
import { TransitionGroup } from 'preact-transitioning';
import { useEffect, useState } from 'preact/hooks';
import { FadeTransition } from '../misc/StyleFadeTransition';

const META: Meta = {
  tags: ['!dev'],
};

export default META;

export const Default: StoryObj<typeof META> = {
  render: () => {
    const [sec, setSec] = useState(0);

    useEffect(() => {
      const i = setInterval(() => {
        setSec(prevSec => prevSec + 1);
      }, 1000);
      return () => {
        clearInterval(i);
      };
    }, []);

    return (
      <TransitionGroup duration={1000} exit={false}>
        <FadeTransition key={sec}>
          <div
            style={{
              fontSize: 64,
            }}
          >
            {sec}
          </div>
        </FadeTransition>
      </TransitionGroup>
    );
  },
};
