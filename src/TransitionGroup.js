/* eslint-disable no-param-reassign */
import { cloneElement } from 'preact'
import { useRef, useLayoutEffect } from 'preact/hooks'

const IGNORE_KEY = 'preact-transition-group-ignore'
const EXIT_TIMEOUT_KEY = 'preact-transition-group-exit-timeout'

const updateVisibleChildren = (
  visibleChildrenRef, isFirstRenderRef, children,
  { appear = false, enter = true, exit = true, duration = 500 } = {},
) => {
  const { current: isFirstRender } = isFirstRenderRef
  const { current: visibleChildren } = visibleChildrenRef
  const nextVisibleChildren = []

  const createVisibleChild = (child, exitTimeout = null) => {
    const clone = cloneElement(child, {
      enter,
      exit,
      duration,
      ...child.props,
      in: !exitTimeout,
      appear: (isFirstRender && appear && child.props.appear !== false)
        || (!isFirstRender && enter && child.props.enter !== false),
    })
    clone[EXIT_TIMEOUT_KEY] = exitTimeout
    nextVisibleChildren.push(clone)
  }

  visibleChildren.forEach((visibleChild) => {
    const { key } = visibleChild
    // Search visible child in derived children list
    const childIndex = children.findIndex((child) => (
      child.key === key && !child[IGNORE_KEY]
    ))
    if (childIndex < 0) {
      // Visible children not found in derived children list
      if (visibleChild[EXIT_TIMEOUT_KEY]) {
        // If child is already exiting then just copy it
        createVisibleChild(visibleChild, visibleChild[EXIT_TIMEOUT_KEY])
      } else if (exit && visibleChild.props.exit !== false) {
        // Create new exiting timeout if needed
        createVisibleChild(visibleChild, setTimeout(() => {
          const indexToDelete = visibleChildrenRef.current.findIndex((v) => v.key === key)
          if (indexToDelete >= 0) {
            visibleChildrenRef.current.splice(indexToDelete, 1)
          }
        }, visibleChild.props.duration || duration))
      }
    } else {
      // Visible child found in derived children list, so remove exiting timeout if it exist
      if (visibleChild[EXIT_TIMEOUT_KEY]) {
        clearTimeout(visibleChild[EXIT_TIMEOUT_KEY])
      }
      // Add previous children
      for (let i = 0; i <= childIndex; i++) {
        const child = children[i]
        if (child && !child[IGNORE_KEY]) {
          child[IGNORE_KEY] = true
          createVisibleChild(child)
        }
      }
    }
  })

  // Add remaining children
  children.forEach((child) => {
    if (child && !child[IGNORE_KEY]) {
      createVisibleChild(child)
    }
  })

  visibleChildrenRef.current = nextVisibleChildren
  return nextVisibleChildren
}

export default (props) => {
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const visibleChildrenRef = useRef(children)
  const isFirstRenderRef = useRef(true)
  useLayoutEffect(() => { isFirstRenderRef.current = false }, [])
  return updateVisibleChildren(visibleChildrenRef, isFirstRenderRef, children, props)
}
