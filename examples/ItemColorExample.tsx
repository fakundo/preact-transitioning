import { useState } from 'preact/hooks';
import { TransitionGroup, CSSTransition } from 'preact-transitioning';
import { COLORS, DURATION } from './config';

export default function ItemColorExample() {
  const [colorItem, setColorItem] = useState(0);

  const switchPrevColor = () => {
    setColorItem(prevColorItem => Math.max(0, prevColorItem - 1));
  };

  const switchNextColor = () => {
    setColorItem(prevColorItem => Math.min(COLORS.length - 1, prevColorItem + 1));
  };

  return (
    <div className="container">
      <button onClick={switchNextColor} type="button">
        Next item color
      </button>{' '}
      <button onClick={switchPrevColor} type="button">
        Prev item color
      </button>
      <hr />
      <TransitionGroup duration={DURATION} exit={false}>
        <CSSTransition key={colorItem} classNames="fade">
          <div className="item" style={{ background: COLORS[colorItem] }}>
            {COLORS[colorItem]}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
