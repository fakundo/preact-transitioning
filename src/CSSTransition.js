/** @jsx h */
import { h, cloneElement } from 'preact'
import { useMemo } from 'preact/hooks'
import Transition from './Transition'

const createClassName = (transition, classNames) => {
  const {
    appear, appearActive, appearDone,
    enter, enterActive, enterDone,
    exit, exitActive, exitDone,
  } = transition

  const classes = typeof classNames === 'string'
    ? {
      appear: `${classNames}-appear`,
      appearActive: `${classNames}-appear-active`,
      appearDone: `${classNames}-appear-done`,
      enter: `${classNames}-enter`,
      enterActive: `${classNames}-enter-active`,
      enterDone: `${classNames}-enter-done`,
      exit: `${classNames}-exit`,
      exitActive: `${classNames}-exit-active`,
      exitDone: `${classNames}-exit-done`,
    }
    : classNames

  switch (true) {
    case appear:
      return classes.appear
    case appearActive:
      return `${classes.appear} ${classes.appearActive}`
    case appearDone:
      return classes.appearDone
    case enter:
      return classes.enter
    case enterActive:
      return `${classes.enter} ${classes.enterActive}`
    case enterDone:
      return classes.enterDone
    case exit:
      return classes.exit
    case exitActive:
      return `${classes.exit} ${classes.exitActive}`
    case exitDone:
      return classes.exitDone
    default:
      return ''
  }
}

export default ({ classNames, children, ...rest }) => (
  <Transition {...rest}>
    {(transition) => {
      const { className: childClassName } = children.props

      const className = useMemo(() => (
        `${childClassName ? `${childClassName} ` : ''}${createClassName(transition, classNames)}`
      ), [childClassName, classNames, transition])

      return cloneElement(children, { className })
    }}
  </Transition>
)
