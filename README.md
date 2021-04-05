# preact-transitioning

[![npm](https://img.shields.io/npm/v/preact-transitioning.svg)](https://www.npmjs.com/package/preact-transitioning)

Exposes Preact components for easily implementing basic CSS animations and transitions.

Lightweight, fast and has no dependencies. Inspired by [`react-transition-group`](https://reactcommunity.org/react-transition-group/) and has almost the same API. Take a look how it works.

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
  in={visible}
  duration={duration}
  appear
  alwaysMounted
>
  { (transitionState) => (
    <pre>{ JSON.stringify(transitionState) }</pre>
  ) }
</Transition>
```

```js
import { CSSTransition } from 'preact-transitioning'

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
```

```js
import { StyleTransition } from 'preact-transitioning'

...

<StyleTransition
  in
  appear
  duration={800}
  styles={{
    appear: { opacity: 0 },
    appearActive: { opacity: 1 },
  }}
>
  <div style={{ transition: 'opacity 800ms' }}>
    Animated
  </div>
</StyleTransition>
```

```js
import { TransitionGroup } from 'preact-transitioning'

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

#### `StyleTransition` props

- `children`
- `styles`
- `...transitionProps`

#### `TransitionGroup` props

- `children`
- `appear = false`
- `enter = true`
- `exit = true`
- `duration = 500`

## License

MIT
