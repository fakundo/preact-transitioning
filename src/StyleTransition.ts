import { createElement, cloneElement, VNode } from 'preact'
import { useMemo } from 'preact/hooks'
import Transition, { TransitionProps, TransitionState } from './Transition'

type StyleTransitionStyles = {
  appear?: object
  appearActive?: object
  appearDone?: object
  enter?: object
  enterActive?: object
  enterDone?: object
  exit?: object
  exitActive?: object
  exitDone?: object
}

interface StyleTransitionProps extends Omit<TransitionProps, 'children'> {
  children: VNode<any>
  styles: StyleTransitionStyles
}

const createStyle = (
  transition: TransitionState,
  styles: StyleTransitionStyles,
): object => {
  switch (true) {
    case transition.appear: return styles.appear
    case transition.appearActive: return { ...styles.appear, ...styles.appearActive }
    case transition.appearDone: return styles.appearDone
    case transition.enter: return styles.enter
    case transition.enterActive: return { ...styles.enter, ...styles.enterActive }
    case transition.enterDone: return styles.enterDone
    case transition.exit: return styles.exit
    case transition.exitActive: return { ...styles.exit, ...styles.exitActive }
    case transition.exitDone: return styles.exitDone
    default: return {}
  }
}

export default (props: StyleTransitionProps): VNode<any> => {
  const { children, styles, ...rest } = props
  return (
    createElement(Transition, rest, (transition: TransitionState) => {
      const { style } = children.props

      const finalStyle = useMemo(() => ({
        ...createStyle(transition, styles), ...style,
      }), [style, styles, transition])

      return cloneElement(children, {
        style: finalStyle,
      })
    })
  )
}
