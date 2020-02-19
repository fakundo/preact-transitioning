# preact-transitioning

[![npm](https://img.shields.io/npm/v/preact-transitioning.svg)](https://www.npmjs.com/package/preact-transitioning)

Exposes Preact components for easily implementing basic CSS animations and transitions.

Inspired by [`react-transition-group`](https://reactcommunity.org/react-transition-group/) and has almost the same API. Take a look how it works.


## Installation
  
```
npm i preact-transitioning
```

## Demo

[Demo](https://fakundo.github.io/preact-transitioning/)
/
[Source](https://github.com/fakundo/preact-transitioning/tree/master/examples)

## Usage

```javascript
import { Transition, CSSTransition, TransitionGroup } from 'preact-transitioning'

...

<Transition
  in={visible}
  duration={duration}
  appear
  alwaysMounted
>
  { (transitionState) => (
    <pre>{ JSON.stringify(transitionState) }</pre>
  ) }
</Transition>

...

<CSSTransition
  in={visible}
  duration={duration}
  exit={false}
  classNames="fade"
>
  <div>
    Animated
  </div>
</CSSTransition>

...

<TransitionGroup duration={duration}>
  { items.map((item) => (
    <CSSTransition
      key={item.key}
      classNames="fade"
    >
      <div>
        { renderItem(item) }
      </div>
    </CSSTransition>
  )) }
</TransitionGroup>

...
```

## API

#### `Transition` props

- `children(transitionState)`
- `in = false`
- `appear = false`
- `enter = true`
- `exit = true`
- `alwaysMounted = false`
- `duration = 500`
- `onEnter()`
- `onEntering()`
- `onEntered()`
- `onExit()`
- `onExiting()`
- `onExited()`

#### `CSSTransition` props

- `children`
- `classNames`
- `...transitionProps`

#### `TransitionGroup` props

- `children`
- `appear = false`
- `enter = true`
- `exit = true`
- `duration = 500`

## License

MIT
