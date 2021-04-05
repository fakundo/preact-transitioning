/** @jsx h */
import { h, cloneElement } from 'preact'
import { useMemo } from 'preact/hooks'
import Transition from './Transition'

const createStyle = (transition, styles) => {
  const {
    appear, appearActive, appearDone,
    enter, enterActive, enterDone,
    exit, exitActive, exitDone,
  } = transition

  switch (true) {
    case appear:
      return styles.appear
    case appearActive:
      return { ...styles.appear, ...styles.appearActive }
    case appearDone:
      return styles.appearDone
    case enter:
      return styles.enter
    case enterActive:
      return { ...styles.enter, ...styles.enterActive }
    case enterDone:
      return styles.enterDone
    case exit:
      return styles.exit
    case exitActive:
      return { ...styles.exit, ...styles.exitActive }
    case exitDone:
      return styles.exitDone
    default:
      return {}
  }
}

export default ({ styles, children, ...rest }) => (
  <Transition {...rest}>
    {(transition) => {
      const { style: childStyle } = children.props

      const style = useMemo(() => ({
        ...createStyle(transition, styles),
        ...childStyle,
      }), [childStyle, styles, transition])

      return cloneElement(children, { style })
    }}
  </Transition>
)
