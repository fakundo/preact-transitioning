import { createElement, cloneElement, VNode, isValidElement } from 'preact';
import { useMemo } from 'preact/hooks';
import { Transition, Phase, TransitionProps } from './Transition';

/**
 * `CSSTransitionClassNames` represents the class names used for CSS-based transitions in different phases.
 * This type can either be a single string, which will be applied to all transition phases
 * with a suffix added based on the current phase, or an object where each key
 * corresponds to a specific transition phase, and the value is the class name for that phase.
 */
export type CSSTransitionClassNames =
  | string
  | {
      [key in Phase]?: string;
    };

export type CSSTransitionProps = Omit<TransitionProps, 'children'> & {
  /**
   * The child element to which the animation will be applied.
   * This should be a single element that supports the `class` prop.
   * The `class` prop will be combined with the class name from the `classNames` prop, based on the current transition phase.
   */
  children: VNode<{ class?: any; className?: any }>;
  /**
   * Defines the CSS class names to be applied for each transition phase.
   */
  classNames: CSSTransitionClassNames;
};

const SUFFIX: {
  [key in Phase]: string;
} = {
  [Phase.APPEAR]: '-appear',
  [Phase.APPEAR_ACTIVE]: '-appear-active',
  [Phase.APPEAR_DONE]: '-appear-done',
  [Phase.ENTER]: '-enter',
  [Phase.ENTER_ACTIVE]: '-enter-active',
  [Phase.ENTER_DONE]: '-enter-done',
  [Phase.EXIT]: '-exit',
  [Phase.EXIT_ACTIVE]: '-exit-active',
  [Phase.EXIT_DONE]: '-exit-done',
};

const appendSuffix = (className: string, suffix: string): string => `${className}${suffix}`;

const joinClassNames = (...classNames: any[]): string =>
  classNames.filter(className => !!className).join(' ');

const recoverClassName = (phase: Phase, classNames: CSSTransitionClassNames) =>
  typeof classNames === 'string' ? appendSuffix(classNames, SUFFIX[phase]) : classNames[phase];

const makeClassName = (phase: Phase, classNames: CSSTransitionClassNames) => {
  const className = recoverClassName(phase, classNames);
  switch (phase) {
    case Phase.APPEAR_ACTIVE:
      return joinClassNames(recoverClassName(Phase.APPEAR, classNames), className);
    case Phase.ENTER_ACTIVE:
      return joinClassNames(recoverClassName(Phase.ENTER, classNames), className);
    case Phase.EXIT_ACTIVE:
      return joinClassNames(recoverClassName(Phase.EXIT, classNames), className);
    default:
      return className;
  }
};

/**
 * The `CSSTransition` component applies CSS transitions based on the phase of a transition lifecycle.
 * It automatically manages the class names for each transition phase (e.g., "appear", "enter", "exit")
 * and applies them to the `children` element.
 */
export function CSSTransition(props: CSSTransitionProps) {
  const { children, classNames, ...rest } = props;

  if (!isValidElement(children)) {
    return null;
  }

  return createElement(Transition, {
    ...rest,
    children: (state, phase: Phase) => {
      const { className: childClassName, class: childClass } = children.props;

      const finalClassName = useMemo(
        () => joinClassNames(childClass || childClassName, makeClassName(phase, classNames)),
        [childClassName, childClass, classNames, phase],
      );

      return cloneElement(children, { class: finalClassName });
    },
  });
}
