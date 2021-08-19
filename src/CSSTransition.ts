import { createElement, cloneElement, VNode } from 'preact'
import { useMemo } from 'preact/hooks'
import Transition, { TransitionProps, TransitionState } from './Transition'

type CSSTransitionClassNames = string | {
  appear?: string
  appearActive?: string
  appearDone?: string
  enter?: string
  enterActive?: string
  enterDone?: string
  exit?: string
  exitActive?: string
  exitDone?: string
}

interface CSSTransitionProps extends Omit<TransitionProps, 'children'> {
  children: VNode<any>
  classNames: CSSTransitionClassNames
}

enum Suffix {
  APPEAR = '-appear',
  APPEAR_ACTIVE = '-appear-active',
  APPEAR_DONE = '-appear-done',
  ENTER = '-enter',
  ENTER_ACTIVE = '-enter-active',
  ENTER_DONE = '-enter-done',
  EXIT = '-exit',
  EXIT_ACTIVE = '-exit-active',
  EXIT_DONE = '-exit-done',
}

const appendSuffix = (className: string, suffix: Suffix): string => (
  `${className}${suffix}`
)

const joinClassNames = (...classNames: any[]): string => (
  classNames.filter((className) => !!className).join(' ')
)

const createClassName = (
  transition: TransitionState,
  classNames: CSSTransitionClassNames,
): string => {
  const classes: CSSTransitionClassNames = typeof classNames === 'string'
    ? {
      appear: appendSuffix(classNames, Suffix.APPEAR),
      appearActive: appendSuffix(classNames, Suffix.APPEAR_ACTIVE),
      appearDone: appendSuffix(classNames, Suffix.APPEAR_DONE),
      enter: appendSuffix(classNames, Suffix.ENTER),
      enterActive: appendSuffix(classNames, Suffix.ENTER_ACTIVE),
      enterDone: appendSuffix(classNames, Suffix.ENTER_DONE),
      exit: appendSuffix(classNames, Suffix.EXIT),
      exitActive: appendSuffix(classNames, Suffix.EXIT_ACTIVE),
      exitDone: appendSuffix(classNames, Suffix.EXIT_DONE),
    }
    : classNames

  switch (true) {
    case transition.appear: return joinClassNames(classes.appear)
    case transition.appearActive: return joinClassNames(classes.appear, classes.appearActive)
    case transition.appearDone: return joinClassNames(classes.appearDone)
    case transition.enter: return joinClassNames(classes.enter)
    case transition.enterActive: return joinClassNames(classes.enter, classes.enterActive)
    case transition.enterDone: return joinClassNames(classes.enterDone)
    case transition.exit: return joinClassNames(classes.exit)
    case transition.exitActive: return joinClassNames(classes.exit, classes.exitActive)
    case transition.exitDone: return joinClassNames(classes.exitDone)
    default: return ''
  }
}

export default (props: CSSTransitionProps): VNode<any> => {
  const { children, classNames, ...rest } = props
  return createElement(Transition, rest, (transition: TransitionState) => {
    const { className } = children.props

    const finalClassName = useMemo(() => (
      joinClassNames(className, createClassName(transition, classNames))
    ), [className, classNames, transition])

    return cloneElement(children, {
      className: finalClassName,
    })
  })
}
