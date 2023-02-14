# preact-transitioning

[![npm](https://img.shields.io/npm/v/preact-transitioning.svg)](https://www.npmjs.com/package/preact-transitioning)

Exposes Preact components for easily implementing basic CSS animations and transitions.

Lightweight and fast implementation. Inspired by [`react-transition-group`](https://reactcommunity.org/react-transition-group/) and has almost the same API. Take a look how it works.

## Installation
  
```
npm i preact-transitioning
```

## Demo

[Demo](https://fakundo.github.io/preact-transitioning/)
/
[Source](https://github.com/fakundo/preact-transitioning/tree/master/examples)

## Usage

```js
import { Transition } from 'preact-transitioning'

...

<Transition
  in={!hidden}
  appear
  exit={false}
>
  {(transitionState) => (
    <pre>
      {JSON.stringify(transitionState)}
    </pre>
  )}
</Transition>
```
###
```js
import { CSSTransition } from 'preact-transitioning'

...

<CSSTransition
  in={!hidden}
  classNames="fade"
>
  <div>
    Animated element
  </div>
</CSSTransition>
```
###
```js
import { StyleTransition } from 'preact-transitioning'

...

<StyleTransition
  in={!hidden}
  duration={300}
  styles={{
    enter: { opacity: 0 },
    enterActive: { opacity: 1 },
  }}
>
  <div style={{ transition: 'opacity 300ms' }}>
    Animated element
  </div>
</StyleTransition>
```
###
```js
import { TransitionGroup } from 'preact-transitioning'

...

<TransitionGroup duration={300}>
  {items.map((item) => (
    <CSSTransition
      key={item.key}
      classNames="fade"
    >
      <div>
        {renderItem(item)}
      </div>
    </CSSTransition>
  ))}
</TransitionGroup>
```

Detecting transition end:

```js
<CSSTransition
  in={!hidden}
  classNames="fade"
  addEndListener={(node, done) => {
    node.addEventListener('transitionend', done, { once: true, capture: false })
  }}
>
  <div>
    Animated element
  </div>
</CSSTransition>
```

Using event callbacks to animate height:

```js
<CSSTransition
  in={!hidden}
  classNames="fade"
  onEnter={(node) => {
    node.style.height = `${node.scrollHeight}px`
  }}
  onEntered={(node) => {
    node.style.height = ''
  }}
  onExit={(node) => {
    node.style.height = `${node.scrollHeight}px`
    // force reflow
    node.clientHeight
  }}
>
  <div>
    Animated element
  </div>
</CSSTransition>
```

## API

### Transition props

```ts
type TransitionProps = {
  children: (transitionState: TransitionState, activePhase: Phase) => any
  in?: boolean = false
  appear?: boolean = false
  enter?: boolean = true
  exit?: boolean = true
  duration?: number = 500
  alwaysMounted?: boolean = false
  onEnter?: (node: Element) => void
  onEntering?: (node: Element) => void
  onEntered?: (node: Element) => void
  onExit?: (node: Element) => void
  onExiting?: (node: Element) => void
  onExited?: (node: Element) => void
  addEndListener?: (node: Element, done: () => void) => void
}
```

TransitionState passed to the children function has the following structure

```ts
type TransitionState = {
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
```

### CSSTransition props

```ts
type CSSTransitionProps = TransitionProps & {
  children: VNode<any>
  classNames: string | {
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
}
```

If classNames is a string, then computed className will be suffixed according to the current transition state. For example, if you pass the string fade as classNames, then fade-appear-active className will be applied during the appearActive phase.

If classNames is an object, then final className will be taken from that object according to the current transition state. For example, when the element enters, enterActive className will be applied.

### StyleTransition props

```ts
type StyleTransitionProps = TransitionProps & {
  children: VNode<any>
  styles: {
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
}
```

The styles prop used to compute inline styles of the element according to the current transition state. For example, when the element enters, enterActive styles will be applied.

### TransitionGroup props

```ts
type TransitionGroupProps = {
  children: any
  appear?: boolean
  enter?: boolean
  exit?: boolean
  duration?: number
}
```

## License

MIT
