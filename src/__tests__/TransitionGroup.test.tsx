import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import { h, VNode } from 'preact';
import { TransitionGroup } from '../TransitionGroup';
import { CSSTransition } from '../CSSTransition';
import { StyleTransition } from '../StyleTransition';

type ChildProps = { class?: any; className?: any };

type StyleChildProps = { style?: any };

const childVNode = (props: Record<string, any>, ...children: any[]): VNode<ChildProps> =>
  h('div', props as ChildProps, ...children) as VNode<ChildProps>;

const styleChildVNode = (props: Record<string, any>, ...children: any[]): VNode<StyleChildProps> =>
  h('div', props as StyleChildProps, ...children) as VNode<StyleChildProps>;

describe('TransitionGroup', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders children', () => {
    const { container } = render(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('renders multiple children', () => {
    const { container } = render(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );
    expect(container.querySelector('[data-testid="child1"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="child2"]')).toBeTruthy();
  });

  it('adds new children', () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child1' }, 'First'),
        }),
      })
    );
    expect(container.querySelector('[data-testid="child1"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="child2"]')).toBeNull();

    rerender(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );
    expect(container.querySelector('[data-testid="child2"]')).toBeTruthy();
  });

  it('removes children', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );
    expect(container.querySelector('[data-testid="child2"]')).toBeTruthy();

    rerender(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child1' }, 'First'),
        }),
      })
    );

    await vi.advanceTimersByTimeAsync(2000);
    expect(container.querySelector('[data-testid="child2"]')).toBeNull();
  });

  it('applies appear prop to children on first render', () => {
    let capturedClass: string | undefined;
    render(
      h(TransitionGroup, {
        appear: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({
            ref: (el: HTMLElement | null) => {
              if (el) capturedClass = el.className;
            },
          }, 'Hello'),
        }),
      })
    );
    expect(capturedClass).toContain('fade-appear');
  });

  it('applies enter prop to children', () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        enter: true,
        children: h(CSSTransition, {
          key: '1', in: false, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    rerender(
      h(TransitionGroup, {
        enter: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('applies exit prop to children', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        exit: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    rerender(
      h(TransitionGroup, { exit: true, children: [] })
    );

    await vi.advanceTimersByTimeAsync(2000);
    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('passes duration to children', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = render(
      h(TransitionGroup, {
        duration: 200,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('uses element props over group props', () => {
    let capturedClass: string | undefined;
    render(
      h(TransitionGroup, {
        appear: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'slide', appear: true,
          children: childVNode({
            ref: (el: HTMLElement | null) => {
              if (el) capturedClass = el.className;
            },
          }, 'Hello'),
        }),
      })
    );
    expect(capturedClass).toContain('slide-appear');
  });

  it('handles StyleTransition children', () => {
    const styles = {
      appear: { opacity: 0 },
      enter: { opacity: 0 },
    };
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(TransitionGroup, {
        appear: true,
        children: h(StyleTransition, {
          key: '1', in: true, styles,
          children: styleChildVNode({
            ref: (el: HTMLElement | null) => {
              if (el) capturedStyle = el.style as any;
            },
          }, 'Hello'),
        }),
      })
    );
    expect(capturedStyle).toBeDefined();
  });

  it('does not exit child when exit=false on element', () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        exit: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade', exit: false,
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    rerender(
      h(TransitionGroup, { exit: true, children: [] })
    );

    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('cleans up removal timeout when child is re-added', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { rerender } = render(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    rerender(
      h(TransitionGroup, { children: [] })
    );

    rerender(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('preserves child order after add and remove', () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );

    const items = container.querySelectorAll('[data-testid]');
    expect(items[0].getAttribute('data-testid')).toBe('child1');
    expect(items[1].getAttribute('data-testid')).toBe('child2');

    rerender(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '3', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child3' }, 'Third'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );

    const itemsAfter = container.querySelectorAll('[data-testid]');
    expect(itemsAfter[0].getAttribute('data-testid')).toBe('child1');
    expect(itemsAfter[1].getAttribute('data-testid')).toBe('child3');
    expect(itemsAfter[2].getAttribute('data-testid')).toBe('child2');
  });

  it('handles adding multiple children at once', () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child1' }, 'First'),
        }),
      })
    );

    expect(container.querySelectorAll('[data-testid]').length).toBe(1);

    rerender(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
          h(CSSTransition, {
            key: '3', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child3' }, 'Third'),
          }),
        ],
      })
    );

    expect(container.querySelectorAll('[data-testid]').length).toBe(3);
  });

  it('handles removing all children', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: [
          h(CSSTransition, {
            key: '1', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child1' }, 'First'),
          }),
          h(CSSTransition, {
            key: '2', in: true, classNames: 'fade',
            children: childVNode({ 'data-testid': 'child2' }, 'Second'),
          }),
        ],
      })
    );

    expect(container.querySelectorAll('[data-testid]').length).toBe(2);

    rerender(
      h(TransitionGroup, { children: [] })
    );

    await vi.advanceTimersByTimeAsync(2000);
    expect(container.querySelectorAll('[data-testid]').length).toBe(0);
  });

  it('passes duration to children for removal timeout', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        duration: 300,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        }),
      })
    );

    rerender(
      h(TransitionGroup, { duration: 300, children: [] })
    );

    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
    await vi.advanceTimersByTimeAsync(100);
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
    await vi.advanceTimersByTimeAsync(300);
    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('does not apply appear on subsequent renders', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        appear: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child1' }, 'First'),
        }),
      })
    );

    expect(container.querySelector('[data-testid="child1"]')).toBeTruthy();

    rerender(
      h(TransitionGroup, {
        appear: true,
        children: h(CSSTransition, {
          key: '1', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'child1' }, 'First'),
        }),
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(container.querySelector('[data-testid="child1"]')).toBeTruthy();
  });

  it('handles swap of children keys with exit', async () => {
    const { container, rerender } = render(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: 'a', in: true, classNames: 'fade',
          children: childVNode({ 'data-testid': 'a' }, 'A'),
        }),
      })
    );

    expect(container.querySelector('[data-testid="a"]')).toBeTruthy();

    rerender(
      h(TransitionGroup, {
        children: h(CSSTransition, {
          key: 'b', in: true, classNames: 'slide',
          children: childVNode({ 'data-testid': 'b' }, 'B'),
        }),
      })
    );

    expect(container.querySelector('[data-testid="b"]')).toBeTruthy();

    await vi.advanceTimersByTimeAsync(2000);
    expect(container.querySelector('[data-testid="a"]')).toBeNull();
    expect(container.querySelector('[data-testid="b"]')).toBeTruthy();
  });
});
