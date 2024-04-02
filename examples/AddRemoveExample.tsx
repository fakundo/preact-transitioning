import { useState } from 'preact/hooks';
import { TransitionGroup, CSSTransition } from 'preact-transitioning';
import { duration } from './config';

export default function AddRemoveExample() {
  const [groupItems, setGroupsItems] = useState([Math.random()]);

  const addGroupItem = () => setGroupsItems(oldGroupItems => [...oldGroupItems, Math.random()]);
  const removeFirstGroupItem = () => setGroupsItems(([, ...nextGroupItems]) => nextGroupItems);
  const removeGroupItem = index =>
    setGroupsItems(oldGroupItems => [
      ...oldGroupItems.slice(0, index),
      ...oldGroupItems.slice(index + 1),
    ]);

  return (
    <div className="container">
      <button onClick={addGroupItem} type="button">
        Add item
      </button>{' '}
      <button onClick={removeFirstGroupItem} type="button">
        Remove first item
      </button>
      <hr />
      <TransitionGroup duration={duration}>
        {groupItems.map((groupItem, index) => (
          <CSSTransition key={groupItem} classNames="fade">
            <button type="button" className="item" onClick={() => removeGroupItem(index)}>
              {`#${index} - ${groupItem}`} &times;
            </button>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
