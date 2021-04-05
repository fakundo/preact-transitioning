import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'preact/hooks'

const noop = () => { }

const APPEAR = 'APPEAR'
const APPEARING = 'APPEARING'
const APPEARED = 'APPEARED'
const ENTER = 'ENTER'
const ENTERING = 'ENTERING'
const ENTERED = 'ENTERED'
const EXIT = 'EXIT'
const EXITING = 'EXITING'
const EXITED = 'EXITED'

export default ({
  in: inProp = false, appear = false, enter = true, exit = true,
  duration = 500, alwaysMounted = false, children,
  onEnter = noop, onEntering = noop, onEntered = noop,
  onExit = noop, onExiting = noop, onExited = noop,
}) => {
  const timeoutRef = useRef(() => setTimeout(noop))
  let ignoreInPropChange = false

  const [phase, setPhase] = useState(() => {
    ignoreInPropChange = true
    if (!inProp) return EXITED
    if (appear) return APPEAR
    return APPEARED
  })

  useEffect(() => {
    switch (phase) {
      case APPEAR:
        onEnter()
        setPhase(APPEARING)
        break
      case APPEARING:
        onEntering()
        timeoutRef.current = setTimeout(() => {
          setPhase(APPEARED)
        }, duration)
        break
      case APPEARED:
        onEntered()
        break
      case ENTER:
        onEnter()
        setPhase(ENTERING)
        break
      case ENTERING:
        onEntering()
        timeoutRef.current = setTimeout(() => {
          setPhase(ENTERED)
        }, duration)
        break
      case ENTERED:
        onEntered()
        break
      case EXIT:
        onExit()
        setPhase(EXITING)
        break
      case EXITING:
        onExiting()
        timeoutRef.current = setTimeout(() => {
          setPhase(EXITED)
        }, duration)
        break
      case EXITED:
        onExited()
        break
    }
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [phase])

  useLayoutEffect(() => {
    if (!ignoreInPropChange) {
      switch (true) {
        case !!(inProp && enter):
          setPhase(ENTER)
          break
        case !!(inProp && !enter):
          setPhase(ENTERED)
          break
        case !!(!inProp && exit):
          setPhase(EXIT)
          break
        case !!(!inProp && !exit):
          setPhase(EXITED)
          break
      }
    }
  }, [inProp])

  const value = useMemo(() => ({
    appear: phase === APPEAR,
    appearActive: phase === APPEARING,
    appearDone: phase === APPEARED,
    enter: phase === ENTER,
    enterActive: phase === ENTERING,
    enterDone: phase === ENTERED,
    exit: phase === EXIT,
    exitActive: phase === EXITING,
    exitDone: phase === EXITED,
  }), [phase])

  return (alwaysMounted || phase !== EXITED) && children(value)
}
