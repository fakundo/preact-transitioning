import { ComponentChildren, createElement } from 'preact';
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'preact/hooks';
import { TransitionChild } from './TransitionChild';

/**
 * Enum representing the different phases of a transition.
 * Each phase corresponds to a specific stage of the transition lifecycle.
 */
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

/**
 * Enum representing event callbacks for various transition phases.
 */
export enum PhaseEvent {
  ENTER = 'onEnter',
  ENTERING = 'onEntering',
  ENTERED = 'onEntered',
  EXIT = 'onExit',
  EXITING = 'onExiting',
  EXITED = 'onExited',
}

/**
 * Type representing the state of each transition phase.
 * Each phase is associated with a boolean value indicating whether that phase is active.
 */
export type TransitionState = {
  [key in Phase]: boolean;
};

export type TransitionProps = {
  /**
   * Event callbacks for different transition phases.
   */
  [key in PhaseEvent]?: (node?: Element | Text) => void;
} & {
  /**
   * If true, the element is shown and transitions through the "appear", "enter", or "exit" phases to the "entered" state.
   * If false, it transitions through the "exit" phases to the "exited" state.
   *
   * @default false
   */
  in?: boolean;
  /**
   * If true, the transition will run the "appear" phases ("appear", "appearActive", "appearDone") when the component is first mounted.
   *
   * @default false
   */
  appear?: boolean;
  /**
   * If true, enables the "enter" phases ("enter", "enterActive", "enterDone") when the component enters.
   *
   * @default true
   */
  enter?: boolean;
  /**
   * If true, enables the "exit" phases ("exit", "exitActive", "exitDone") when the component leaves.
   *
   * @default true
   */
  exit?: boolean;
  /**
   * Duration of the transition in milliseconds. Can be used to override default durations for the phases.
   *
   * @default DEFAULT_TRANSITION_DURATION=500
   */
  duration?: number;
  /**
   * If true, the component remains mounted in the DOM even when it transitions to the "exited" state.
   *
   * @default false
   */
  alwaysMounted?: boolean;
  /**
   * A function called to manually handle the end of a transition phase.
   *
   * @param node - The transitioning element.
   * @param done - A callback function to signal that the phase is complete.
   */
  addEndListener?: (node: Element | Text, done: () => void) => void;
  /**
   * A render function that provides the current transition state and active phase.
   *
   * @param transitionState - The current state of the transition, indicating which phase is active.
   * @param activePhase - The phase currently in progress (e.g., "appearActive", "enterDone").
   * @returns Element to render.
   */
  children: (transitionState: TransitionState, activePhase: Phase) => ComponentChildren;
};

const EVENT_MAP: {
  [key in Phase]: [eventName: PhaseEvent, nextPhase?: Phase, delay?: boolean];
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

export const DEFAULT_TRANSITION_DURATION = 500;

/**
 * The `Transition` component handles the animation lifecycle of a component as it enters and exits
 * the DOM. The component can manage transitions for different phases: "appear", "enter",
 * and "exit", with each phase having an active state and a done state. These phases can be triggered and
 * customized based on the visibility of the component (controlled by the `in` prop).
 */
export function Transition(props: TransitionProps) {
  const {
    children,
    in: inProp = false,
    appear = false,
    enter = true,
    exit = true,
    duration = DEFAULT_TRANSITION_DURATION,
    alwaysMounted = false,
    addEndListener,
  } = props;

  const nodeRef = useRef<Element | Text>(null!);

  // Make phase state
  const [phase, setPhase] = useState(() => {
    switch (true) {
      case !inProp:
        return Phase.EXIT_DONE;
      case !!appear:
        return Phase.APPEAR;
      default:
        return Phase.APPEAR_DONE;
    }
  });

  // Effect for phase change
  useEffect(() => {
    const { setTimeout, clearTimeout } = window;
    const [eventName, nextPhase, delay] = EVENT_MAP[phase];
    const { [eventName]: event } = props;
    event?.(nodeRef.current);
    let tm = 0;
    let af = 0;
    if (nextPhase) {
      if (delay) {
        if (addEndListener) {
          addEndListener(nodeRef.current, () => setPhase(nextPhase));
        } else {
          tm = setTimeout(setPhase, duration, nextPhase);
        }
      } else {
        af = requestAnimationFrame(() => setPhase(nextPhase));
      }
    }
    return () => {
      clearTimeout(tm);
      cancelAnimationFrame(af);
    };
  }, [phase, duration]);

  // Effect for handling `in` prop changes
  useLayoutEffect(() => {
    const isExitPhase = [Phase.EXIT, Phase.EXIT_ACTIVE, Phase.EXIT_DONE].includes(phase);
    if (inProp && isExitPhase) {
      setPhase(enter ? Phase.ENTER : Phase.ENTER_DONE);
    }
    if (!inProp && !isExitPhase) {
      setPhase(exit ? Phase.EXIT : Phase.EXIT_DONE);
    }
  }, [inProp]);

  // Make transition state
  const transitionState = useMemo(
    () =>
      Object.keys(EVENT_MAP).reduce(
        (acc, phaseI) => ({ ...acc, [phaseI]: phase === phaseI }),
        {} as TransitionState,
      ),
    [phase],
  );

  // Do not render anything
  if (!alwaysMounted && (exit ? phase === Phase.EXIT_DONE : !inProp)) {
    return null;
  }

  // Render children
  return createElement(TransitionChild, {
    nodeRef,
    children: typeof children === 'function' ? children(transitionState, phase) : children,
  });
}
