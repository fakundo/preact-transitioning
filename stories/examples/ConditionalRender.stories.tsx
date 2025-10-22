import { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { TransitionGroup } from 'preact-transitioning';
import { FadeTransition } from '../misc/StyleFadeTransition';

const META: Meta = {
  tags: ['!dev'],
};

export default META;

export const Default: StoryObj<typeof META> = {
  render: () => {
    const [showFirstItem, setShowFirstItem] = useState(true);
    const [showSecondItem, setShowSecondItem] = useState(true);
    const [showThirdItem, setShowThirdItem] = useState(false);

    const toggleFirstItem = () => setShowFirstItem(!showFirstItem);
    const toggleSecondItem = () => setShowSecondItem(!showSecondItem);
    const toggleThirdItem = () => setShowThirdItem(!showThirdItem);

    return (
      <>
        <div className="group">
          <button onClick={toggleFirstItem} type="button">
            Toggle first item
          </button>
          <button onClick={toggleSecondItem} type="button">
            Toggle second item
          </button>
          <button onClick={toggleThirdItem} type="button">
            Toggle third item
          </button>
        </div>
        <hr />
        <TransitionGroup>
          {showFirstItem && (
            <FadeTransition key="1">
              <div>First item</div>
            </FadeTransition>
          )}
          {showSecondItem && (
            <FadeTransition key="2">
              <div>Second item</div>
            </FadeTransition>
          )}
          {showThirdItem && (
            <FadeTransition key="3">
              <div>Third item</div>
            </FadeTransition>
          )}
        </TransitionGroup>
      </>
    );
  },
};
