import {
  cloneElement,
  ComponentChildren,
  VNode,
  toChildArray,
  Fragment,
  createElement,
} from 'preact';
import { useRef } from 'preact/hooks';

const getChildProp = <T>(
  child: VNode<any> | string | number,
  propName: string,
  defaultValue: T,
): T => {
  const { [propName]: prop = defaultValue } = typeof child === 'object' ? child.props : {};
  return prop;
};

const getChildKey = (child: VNode | number | string) =>
  typeof child === 'object' ? child.key : undefined;

export type TransitionGroupProps = {
  children: ComponentChildren;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  duration?: number;
};

export function TransitionGroup(props: TransitionGroupProps) {
  const { children, appear = false, enter = true, exit = true, duration = 500 } = props;

  const derivedChildren = toChildArray(children);
  const firstRenderRef = useRef(true);
  const nextVisibleChildren: { visibleChild: VNode<any>; removeTimeout: number }[] = [];
  const prevVisibleChildrenRef = useRef([] as typeof nextVisibleChildren);
  const nextChildren: typeof derivedChildren = [];

  const addVisibleChild = (child: (typeof derivedChildren)[number], removeTimeout: number) => {
    // No child to add
    if (!child || typeof child !== 'object') {
      return;
    }

    // Create child clone with new props
    const visibleChild = cloneElement(child, {
      enter,
      exit,
      duration,
      ...child.props,
      in: !removeTimeout,
      appear: firstRenderRef.current
        ? getChildProp(child, 'appear', appear)
        : getChildProp(child, 'enter', enter),
    });

    // Save child clone and timeout
    nextVisibleChildren.push({ visibleChild, removeTimeout });
    nextChildren.push(visibleChild);
  };

  const makeRemoveTimeout = (child: VNode<any>) =>
    window.setTimeout(
      () => {
        const { current: prevVisibleChildren } = prevVisibleChildrenRef;
        const indexToDelete = prevVisibleChildren.findIndex(
          ({ visibleChild }) => visibleChild.key === child.key,
        );
        if (indexToDelete >= 0) {
          prevVisibleChildren.splice(indexToDelete, 1);
        }
      },
      getChildProp(child, 'duration', duration),
    );

  let lastAddedChildIndex = 0;

  // Check previous visible children first
  prevVisibleChildrenRef.current.forEach(({ visibleChild, removeTimeout }) => {
    // Search visible child in derived children, key is required for proper work
    const foundIndex = derivedChildren.findIndex(child => getChildKey(child) === visibleChild.key);
    // Visible child not found, start to remove it
    if (foundIndex < 0) {
      // Visible child already has remove timeout what means child exiting atm
      if (removeTimeout) {
        addVisibleChild(visibleChild, removeTimeout);
      } else {
        // Start remove timeout but render this child
        const shouldAddTimeout = exit && visibleChild.props.exit !== false;
        if (shouldAddTimeout) {
          addVisibleChild(visibleChild, makeRemoveTimeout(visibleChild));
        }
      }
    } else {
      // Visible child found in derived children, remove exiting timeout if it exist
      if (removeTimeout) {
        window.clearTimeout(removeTimeout);
      }
      // Add this child and all previous children
      for (let i = lastAddedChildIndex; i <= foundIndex; i++) {
        addVisibleChild(derivedChildren[i], null);
      }
    }
    // Save index to loop only through the remaining children
    lastAddedChildIndex = Math.max(lastAddedChildIndex, foundIndex + 1);
  });

  // Add remaining children
  for (let i = lastAddedChildIndex; i < derivedChildren.length; i++) {
    addVisibleChild(derivedChildren[i], null);
  }

  // Save visible children
  prevVisibleChildrenRef.current = nextVisibleChildren;
  firstRenderRef.current = false;
  return createElement(Fragment, {}, nextChildren);
}
