# preact-transitioning

[![npm](https://img.shields.io/npm/v/preact-transitioning.svg)](https://www.npmjs.com/package/preact-transitioning)
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/fakundo/preact-transitioning)

A library that provides components for managing animations and transitions with ease. It allows seamless transitions for both individual components and groups of elements. Lightweight and has no dependencies. Inspired by [react-transition-group](https://reactcommunity.org/react-transition-group/) and has almost the same API.

```tsx
<FadeTransition in={visible}>
  <div>Fading element</div>
</FadeTransition>
```

## Installation

To install `preact-transitioning`, run the following command in your project:

```bash
npm install preact-transitioning
# or
yarn add preact-transitioning
```

## Documentation

For more detailed information and usage examples, check out the [Docs](https://fakundo.github.io/preact-transitioning/).

## Quick Review

### Transition Component

The `Transition` component allows you to control the mounting and unmounting of an element with transitions.

```tsx
import { Transition } from 'preact-transitioning'

...

<Transition in={!hidden} appear exit={false}>
  {(transitionState) => (
    <pre>{JSON.stringify(transitionState)}</pre>
  )}
</Transition>
```

### CSSTransition Component

The `CSSTransition` component applies CSS classes based on the current transition state.

```tsx
import { CSSTransition } from 'preact-transitioning'

...

<CSSTransition in={!hidden} classNames="fade">
  <div>Animated element</div>
</CSSTransition>
```

### StyleTransition Component

The `StyleTransition` component applies inline styles based on the current transition state. This is useful for customizing transitions without external CSS.

```tsx
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
  <div style={{ transition: 'opacity 300ms' }}>Animated element</div>
</StyleTransition>
```

### TransitionGroup Component

The `TransitionGroup` component handles a set of elements, animating them as they are added or removed from the DOM.

```tsx
import { TransitionGroup } from 'preact-transitioning'

...

<TransitionGroup duration={300}>
  {items.map((item) => (
    <CSSTransition key={item.key} classNames="fade">
      <div>{item.label}</div>
    </CSSTransition>
  ))}
</TransitionGroup>
```

## Component Props

### TransitionProps

```ts
type TransitionProps = {
  children: (transitionState: TransitionState, activePhase: Phase) => ComponentChildren;
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  duration?: number;
  alwaysMounted?: boolean;
  addEndListener?: (node: Element | Text, done: () => void) => void;
  onEnter: () => void;
  onEntering: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExiting: () => void;
  onExited: () => void;
}
```

The `TransitionState` passed to the children function has the following structure:

```ts
type TransitionState = {
  appear: boolean;
  appearActive: boolean;
  appearDone: boolean;
  enter: boolean;
  enterActive: boolean;
  enterDone: boolean;
  exit: boolean;
  exitActive: boolean;
  exitDone: boolean;
}
```

### CSSTransitionProps

```ts
type CSSTransitionProps = Omit<TransitionProps, 'children'> & {
  children: VNode<{ class?: any; }>;
  classNames: string | {
    appear?: string;
    appearActive?: string;
    appearDone?: string;
    enter?: string;
    enterActive?: string;
    enterDone?: string;
    exit?: string;
    exitActive?: string;
    exitDone?: string;
  };
}
```

if `classNames` is a string, then the computed `className` will be suffixed based on the current transition state. 
For example, when `classNames` is `"fade"`, the `fade-appear-active` class will be applied during the `appearActive` phase.

If `classNames` is an object, the final `className` will be taken from that object based on the current transition state.

### StyleTransitionProps

```ts
type StyleTransitionProps = Omit<TransitionProps, 'children'> & {
  children: VNode<{ style?: any; }>;
  styles: {
    appear?: object;
    appearActive?: object;
    appearDone?: object;
    enter?: object;
    enterActive?: object;
    enterDone?: object;
    exit?: object;
    exitActive?: object;
    exitDone?: object;
  };
}
```

The `styles` prop allows you to define inline styles based on the current transition state. For example, when the element enters, the `enterActive` styles will be applied.

### TransitionGroupProps

```ts
type TransitionGroupProps = {
  children: ComponentChildren;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  duration?: number;
}
```

## License

MIT
