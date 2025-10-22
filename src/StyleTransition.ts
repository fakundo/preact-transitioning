import { createElement, cloneElement, VNode, isValidElement } from 'preact';
import { useMemo } from 'preact/hooks';
import { Transition, Phase, TransitionProps } from './Transition';

/**
 * Type representing styles for different transition phases.
 * `Phase` is the key representing different phases, and the value is a CSS properties object.
 */
export type StyleTransitionStyles = {
  [key in Phase]?: object;
};

const makePhaseStyle = (phase: Phase, styles: StyleTransitionStyles) => {
  const style = styles[phase];
  switch (phase) {
    case Phase.APPEAR_ACTIVE:
      return { ...styles[Phase.APPEAR], ...style };
    case Phase.ENTER_ACTIVE:
      return { ...styles[Phase.ENTER], ...style };
    case Phase.EXIT_ACTIVE:
      return { ...styles[Phase.EXIT], ...style };
    default:
      return style;
  }
};

export type StyleTransitionProps = Omit<TransitionProps, 'children'> & {
  /**
   * The child element to which the animation will be applied.
   * This should be a single element that supports the `style` prop.
   * The `style` prop will be combined with the styles specified in the `styles` prop for the current transition phase.
   */
  children: VNode<{ style?: any }>;
  /**
   * An object containing styles for different animation phases.
   * `Phase` indicates the animation phase, for which specific styles can be applied.
   * Each phase style is represented by a CSS properties object.
   */
  styles: StyleTransitionStyles;
};

/**
 * The `StyleTransition` component allows you to animate the styles of a component across different
 * transition phases. It automatically manages the styles for each transition phase
 * (e.g., "appear", "enter", "exit") and applies them to the `children` element.
 */
export function StyleTransition(props: StyleTransitionProps) {
  const { children, styles, ...rest } = props;

  if (!isValidElement(children)) {
    return null;
  }

  return createElement(Transition, {
    ...rest,
    children: (state, phase: Phase) => {
      const { style: childStyle } = children.props;

      const finalStyle = useMemo(
        () => ({ ...childStyle, ...makePhaseStyle(phase, styles) }),
        [childStyle, styles, phase],
      );

      return cloneElement(children, { style: finalStyle });
    },
  });
}
