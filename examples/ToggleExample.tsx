import { useState } from 'preact/hooks';
import { Transition, CSSTransition, StyleTransition } from 'preact-transitioning';
import { DURATION } from './config';

export default function ToggleExample() {
  const [visible, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(prevVisible => !prevVisible);
  };

  return (
    <div className="container">
      <button onClick={toggleVisibility} type="button">
        Toggle visibility
      </button>

      <hr />

      <Transition in={visible} appear duration={DURATION} alwaysMounted>
        {transitionState => (
          <div>
            <h5>Transition state</h5>
            <pre>{JSON.stringify(transitionState, null, ' ')}</pre>
          </div>
        )}
      </Transition>

      <hr />

      <CSSTransition in={visible} appear duration={DURATION} classNames="fade" alwaysMounted>
        <div className="item">Visible [class name]</div>
      </CSSTransition>

      <hr />

      <StyleTransition
        in={visible}
        appear
        duration={DURATION}
        alwaysMounted
        styles={{
          appear: { opacity: 0 },
          appearActive: { opacity: 1 },
          enter: { opacity: 0 },
          enterActive: { opacity: 1 },
          exit: { opacity: 1 },
          exitActive: { opacity: 0 },
          exitDone: { opacity: 0 },
        }}
        onEnter={node => console.log('onEnter', node)}
      >
        <div className="item">Visible [inline styles]</div>
      </StyleTransition>
    </div>
  );
}
