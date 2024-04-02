import { useState } from 'preact/hooks';
import { TransitionGroup, CSSTransition } from 'preact-transitioning';
import { DURATION } from './config';

export default function AddRemoveExample() {
  const [items, setItems] = useState([Math.random()]);

  const addItem = () => {
    setItems(prevItems => [...prevItems, Math.random()]);
  };

  const removeFirstItem = () => {
    setItems(([, ...nextGroupItems]) => nextGroupItems);
  };

  const removeItem = index => {
    setItems(prevItems => [...prevItems.slice(0, index), ...prevItems.slice(index + 1)]);
  };

  return (
    <div className="container">
      <button onClick={addItem} type="button">
        Add item
      </button>{' '}
      <button onClick={removeFirstItem} type="button">
        Remove first item
      </button>
      <hr />
      <TransitionGroup duration={DURATION}>
        {items.map((groupItem, index) => (
          <CSSTransition key={groupItem} classNames="fade">
            <button type="button" className="item" onClick={() => removeItem(index)}>
              &times; {groupItem}
            </button>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
