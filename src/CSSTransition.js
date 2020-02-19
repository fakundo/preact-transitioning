/** @jsx h */
import { h, cloneElement } from 'preact'
import classnames from 'classnames'
import Transition from './Transition'

const createClassName = (transitionProps, classNames) => {
  const {
    appear, appearActive, appearDone,
    enter, enterActive, enterDone,
    exit, exitActive, exitDone,
  } = transitionProps

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

  return classnames({
    [classes.appear]: appear || appearActive,
    [classes.appearActive]: appearActive,
    [classes.appearDone]: appearDone,
    [classes.enter]: enter || enterActive,
    [classes.enterActive]: enterActive,
    [classes.enterDone]: enterDone || appearDone,
    [classes.exit]: exit || exitActive,
    [classes.exitActive]: exitActive,
    [classes.exitDone]: exitDone,
  })
}

export default ({ classNames, children, ...rest }) => (
  <Transition {...rest}>
    { (transitionProps) => (
      cloneElement(children, {
        className: classnames(
          createClassName(transitionProps, classNames),
          children.props.className,
        ),
      })
    ) }
  </Transition>
)
