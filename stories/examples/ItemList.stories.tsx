import { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { TransitionGroup } from 'preact-transitioning';
import { FadeTransition } from '../misc/StyleFadeTransition';

const makeItem = () => `Fading item #${Math.random().toString().substring(2, 8)}`;

const META: Meta = {
  tags: ['!dev'],
};

export default META;

export const Default: StoryObj<typeof META> = {
  render: () => {
    const [shouldAnimateShuffle, setShouldAnimateShuffle] = useState(false);
    const [items, setItems] = useState(() => new Array(10).fill('').map(makeItem));

    const addToStart = () => setItems([makeItem(), ...items]);
    const addToEnd = () => setItems([...items, makeItem()]);
    const removeFromStart = () => setItems(items.slice(1));
    const removeFromEnd = () => setItems(items.slice(0, items.length - 1));
    const removeFromCenter = () =>
      setItems([...items.slice(0, items.length / 2), ...items.slice(items.length / 2 + 1)]);
    const shuffle = () => setItems([...items.sort(() => 0.5 - Math.random())]);
    const toggleShouldAnimateShuffle = () => setShouldAnimateShuffle(!shouldAnimateShuffle);
    const removeItem = (index: number) => () =>
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);

    return (
      <>
        <div className="group">
          <button onClick={addToStart} type="button">
            + Add item to the start
          </button>
          <button onClick={addToEnd} type="button">
            + Add item to the end
          </button>
          <button onClick={removeFromStart} type="button">
            × Remove item from the start
          </button>
          <button onClick={removeFromCenter} type="button">
            × Remove item from the center
          </button>
          <button onClick={removeFromEnd} type="button">
            × Remove item from the end
          </button>
          <button onClick={shuffle} type="button">
            ? Shuffle items
          </button>
          <label>
            <input type="checkbox" checked={shouldAnimateShuffle} onChange={toggleShouldAnimateShuffle} />
            Should animate shuffle
          </label>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.25rem',
          }}
        >
          <TransitionGroup exit={!shouldAnimateShuffle}>
            {items.map((item, index) => (
              <FadeTransition key={shouldAnimateShuffle ? `${item}${index}` : item}>
                <div>
                  <button onClick={removeItem(index)} type="button">
                    ×
                  </button>
                  <span> {item}</span>
                </div>
              </FadeTransition>
            ))}
          </TransitionGroup>
        </div>
      </>
    );
  },
};
