import { createElement, cloneElement, VNode } from 'preact'
import { useMemo } from 'preact/hooks'
import Transition, { Phase, TransitionProps } from './Transition'

type StyleTransitionStyles = {
  [key in Phase]?: object
}

type StyleTransitionProps = Omit<TransitionProps, 'children'> & {
  children: VNode<any>
  styles: StyleTransitionStyles
}

const computeStyle = (phase: Phase, styles: StyleTransitionStyles) => {
  const style = styles[phase]
  switch (phase) {
    case Phase.APPEAR_ACTIVE: return { ...styles[Phase.APPEAR], ...style }
    case Phase.ENTER_ACTIVE: return { ...styles[Phase.ENTER], ...style }
    case Phase.EXIT_ACTIVE: return { ...styles[Phase.EXIT], ...style }
    default: return style
  }
}

export default (props: StyleTransitionProps): VNode<any> => {
  const { children, styles, ...rest } = props
  return createElement(Transition, rest, (state, phase: Phase) => {
    const { style } = children.props

    const finalStyle = useMemo(() => ({
      ...computeStyle(phase, styles), ...style,
    }), [style, styles, phase])

    return cloneElement(children, {
      style: finalStyle,
    })
  })
}
