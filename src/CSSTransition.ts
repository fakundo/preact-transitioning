import { createElement, cloneElement, VNode } from 'preact';
import { useMemo } from 'preact/hooks';
import Transition, { Phase, TransitionProps } from './Transition';

type CSSTransitionClassNames =
  | string
  | {
      [key in Phase]?: string;
    };

type CSSTransitionProps = Omit<TransitionProps, 'children'> & {
  children: VNode<any>;
  classNames: CSSTransitionClassNames;
};

const Suffix: {
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
  typeof classNames === 'string' ? appendSuffix(classNames, Suffix[phase]) : classNames[phase];

const computeClassName = (phase: Phase, classNames: CSSTransitionClassNames) => {
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

export default (props: CSSTransitionProps): VNode<any> => {
  const { children, classNames, ...rest } = props;

  if (!rest.duration) {
    const addEndListener = rest.addEndListener;

    rest.addEndListener = (node: Element, done: () => void) => {
      if (addEndListener) {
        addEndListener(node, done);
      } else {
        node.addEventListener("transitionend", done, { once: true });
      }
    };
  }

  return createElement(Transition, rest, (state, phase: Phase) => {
    const { className } = children.props;

    const finalClassName = useMemo(
      () => joinClassNames(className, computeClassName(phase, classNames)),
      [className, classNames, phase],
    );

    return cloneElement(children, { className: finalClassName });
  });
};
