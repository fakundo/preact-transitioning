import { useState } from 'preact/hooks';
import { TransitionGroup, CSSTransition } from 'preact-transitioning';
import { colorItems, duration } from './config';

export default function ItemColorExample() {
  const [colorItem, setColorItem] = useState(0);
  const switchPrevColorItem = () => setColorItem(prevColorItem => Math.max(0, prevColorItem - 1));
  const switchNextColorItem = () =>
    setColorItem(prevColorItem => Math.min(colorItems.length - 1, prevColorItem + 1));

  return (
    <div className="container">
      <button onClick={switchNextColorItem} type="button">
        Next item color
      </button>{' '}
      <button onClick={switchPrevColorItem} type="button">
        Prev item color
      </button>
      <hr />
      <TransitionGroup duration={duration} exit={false}>
        <CSSTransition key={colorItem} classNames="fade">
          <div className="item" style={{ background: colorItems[colorItem] }}>
            {colorItems[colorItem]}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
