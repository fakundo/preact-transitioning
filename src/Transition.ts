import { VNode } from 'preact'
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'preact/hooks'

export interface TransitionState {
  appear: boolean
  appearActive: boolean
  appearDone: boolean
  enter: boolean
  enterActive: boolean
  enterDone: boolean
  exit: boolean
  exitActive: boolean
  exitDone: boolean
}

export interface TransitionProps {
  children: (transitionState: TransitionState) => any
  in?: boolean
  appear?: boolean
  enter?: boolean
  exit?: boolean
  duration?: number
  alwaysMounted?: boolean
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

enum Phase {
  APPEAR,
  APPEARING,
  APPEARED,
  ENTER,
  ENTERING,
  ENTERED,
  EXIT,
  EXITING,
  EXITED,
}

const NOOP = () => { }
const TM = setTimeout(NOOP)

export default (props: TransitionProps): VNode<any> => {
  const {
    children, in: inProp = false,
    appear = false, enter = true, exit = true,
    duration = 500, alwaysMounted = false,
    onEnter = NOOP, onEntering = NOOP, onEntered = NOOP,
    onExit = NOOP, onExiting = NOOP, onExited = NOOP,
  } = props

  const timeoutRef = useRef(TM)
  let ignoreInPropChange = false

  const [phase, setPhase] = useState(() => {
    ignoreInPropChange = true
    if (!inProp) {
      return Phase.EXITED
    }
    if (appear) {
      return Phase.APPEAR
    }
    return Phase.APPEARED
  })

  useEffect(() => {
    switch (phase) {
      case Phase.APPEAR: {
        onEnter()
        setPhase(Phase.APPEARING)
        break
      }
      case Phase.APPEARING: {
        onEntering()
        timeoutRef.current = setTimeout(() => {
          setPhase(Phase.APPEARED)
        }, duration)
        break
      }
      case Phase.APPEARED: {
        onEntered()
        break
      }
      case Phase.ENTER: {
        onEnter()
        setPhase(Phase.ENTERING)
        break
      }
      case Phase.ENTERING: {
        onEntering()
        timeoutRef.current = setTimeout(() => {
          setPhase(Phase.ENTERED)
        }, duration)
        break
      }
      case Phase.ENTERED: {
        onEntered()
        break
      }
      case Phase.EXIT: {
        onExit()
        setPhase(Phase.EXITING)
        break
      }
      case Phase.EXITING: {
        onExiting()
        timeoutRef.current = setTimeout(() => {
          setPhase(Phase.EXITED)
        }, duration)
        break
      }
      case Phase.EXITED: {
        onExited()
        break
      }
    }
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [phase])

  useLayoutEffect(() => {
    if (!ignoreInPropChange) {
      switch (true) {
        case !!(inProp && enter): {
          setPhase(Phase.ENTER)
          break
        }
        case !!(inProp && !enter): {
          setPhase(Phase.ENTERED)
          break
        }
        case !!(!inProp && exit): {
          setPhase(Phase.EXIT)
          break
        }
        case !!(!inProp && !exit): {
          setPhase(Phase.EXITED)
          break
        }
      }
    }
  }, [inProp])

  const value = useMemo((): TransitionState => ({
    appear: phase === Phase.APPEAR,
    appearActive: phase === Phase.APPEARING,
    appearDone: phase === Phase.APPEARED,
    enter: phase === Phase.ENTER,
    enterActive: phase === Phase.ENTERING,
    enterDone: phase === Phase.ENTERED,
    exit: phase === Phase.EXIT,
    exitActive: phase === Phase.EXITING,
    exitDone: phase === Phase.EXITED,
  }), [phase])

  return (alwaysMounted || phase !== Phase.EXITED)
    && children(value)
}
