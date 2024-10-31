import { VNode, cloneElement } from 'preact';
import { mergeRefs } from 'preact-merge-refs';
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'preact/hooks';

export enum Phase {
  APPEAR = 'appear',
  APPEAR_ACTIVE = 'appearActive',
  APPEAR_DONE = 'appearDone',
  ENTER = 'enter',
  ENTER_ACTIVE = 'enterActive',
  ENTER_DONE = 'enterDone',
  EXIT = 'exit',
  EXIT_ACTIVE = 'exitActive',
  EXIT_DONE = 'exitDone',
}

export enum PhaseEvent {
  ENTER = 'onEnter',
  ENTERING = 'onEntering',
  ENTERED = 'onEntered',
  EXIT = 'onExit',
  EXITING = 'onExiting',
  EXITED = 'onExited',
}

const EventMapping: {
  [key in Phase]: [PhaseEvent, Phase?, boolean?];
} = {
  [Phase.APPEAR]: [PhaseEvent.ENTER, Phase.APPEAR_ACTIVE],
  [Phase.APPEAR_ACTIVE]: [PhaseEvent.ENTERING, Phase.APPEAR_DONE, true],
  [Phase.APPEAR_DONE]: [PhaseEvent.ENTERED],
  [Phase.ENTER]: [PhaseEvent.ENTER, Phase.ENTER_ACTIVE],
  [Phase.ENTER_ACTIVE]: [PhaseEvent.ENTERING, Phase.ENTER_DONE, true],
  [Phase.ENTER_DONE]: [PhaseEvent.ENTERED],
  [Phase.EXIT]: [PhaseEvent.EXIT, Phase.EXIT_ACTIVE],
  [Phase.EXIT_ACTIVE]: [PhaseEvent.EXITING, Phase.EXIT_DONE, true],
  [Phase.EXIT_DONE]: [PhaseEvent.EXITED],
};

export type TransitionState = {
  [key in Phase]: boolean;
};

export type TransitionProps = {
  [key in PhaseEvent]?: (node?: Element) => void;
} & {
  children: (transitionState: TransitionState, activePhase: Phase) => any;
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  duration?: number;
  alwaysMounted?: boolean;
  addEndListener?: (node: Element, done: () => void) => void;
};

export default (props: TransitionProps): VNode<any> => {
  const {
    children,
    in: inProp = false,
    appear = false,
    enter = true,
    exit = true,
    duration = 500,
    alwaysMounted = false,
    addEndListener,
  } = props;

  const nodeRef = useRef<Element>();
  const tmRef = useRef<number>();
  let ignoreInPropChange = false;

  // Make state
  const [phase, setPhase] = useState(() => {
    ignoreInPropChange = true;
    if (!inProp) {
      return Phase.EXIT_DONE;
    }
    if (appear) {
      return Phase.APPEAR;
    }
    return Phase.APPEAR_DONE;
  });

  // Effect for phase change
  useEffect(() => {
    const { setTimeout, clearTimeout } = window;
    const [eventName, nextPhase, delay] = EventMapping[phase];
    props[eventName]?.(nodeRef.current);
    if (nextPhase) {
      if (delay) {
        if (addEndListener) {
          addEndListener(nodeRef.current, () => setPhase(nextPhase));
        } else {
          tmRef.current = setTimeout(setPhase, duration, nextPhase);
        }
      } else {
        setPhase(nextPhase);
      }
    }
    return () => {
      clearTimeout(tmRef.current);
    };
  }, [phase, duration]);

  // Effect for initial phase
  useLayoutEffect(() => {
    if (!ignoreInPropChange) {
      if (inProp) {
        setPhase(enter ? Phase.ENTER : Phase.ENTER_DONE);
      } else {
        setPhase(exit ? Phase.EXIT : Phase.EXIT_DONE);
      }
    }
  }, [inProp]);

  // Make transition state
  const transitionState = useMemo(() => {
    const value = {};
    Object.values(Phase).forEach(val => {
      value[val] = phase === val;
    });
    return value as TransitionState;
  }, [phase]);

  // Do not render anything
  if (!alwaysMounted && phase === Phase.EXIT_DONE) {
    return null;
  }

  // Render child
  const child = children(transitionState, phase);
  return cloneElement(child, { ref: mergeRefs([nodeRef, child.ref]) });
};
