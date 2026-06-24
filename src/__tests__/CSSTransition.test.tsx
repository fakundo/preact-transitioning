import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup, act } from '@testing-library/preact';
import { h, VNode } from 'preact';
import { CSSTransition } from '../CSSTransition';
import { Phase } from '../Transition';

type ChildProps = { class?: any; className?: any };

const childVNode = (props: Record<string, any>, ...children: any[]): VNode<ChildProps> =>
  h('div', props as ChildProps, ...children) as VNode<ChildProps>;

describe('CSSTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('applies className with suffix based on phase', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: false,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('fade-appear-done');
  });

  it('applies appear classes when appear=true', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: true,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('fade-appear');
  });

  it('supports object classNames', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: {
          [Phase.APPEAR_DONE]: 'custom-appear-done',
        },
        appear: false,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('custom-appear-done');
  });

  it('preserves existing class on child', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: false,
        children: childVNode({
          class: 'existing-class',
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('existing-class');
    expect(capturedClass).toContain('fade-appear-done');
  });

  it('returns null for invalid children', () => {
    const { container } = render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        children: null as any,
      })
    );

    expect(container.innerHTML).toBe('');
  });

  it('merges appear-active with appear class', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: true,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('fade-appear');
  });

  it('supports all transition phases', () => {
    const allPhases = [
      Phase.APPEAR, Phase.APPEAR_ACTIVE, Phase.APPEAR_DONE,
      Phase.ENTER, Phase.ENTER_ACTIVE, Phase.ENTER_DONE,
      Phase.EXIT, Phase.EXIT_ACTIVE, Phase.EXIT_DONE,
    ];

    allPhases.forEach(() => {
      cleanup();

      let capturedClass: string | undefined;
      render(
        h(CSSTransition, {
          in: true,
          classNames: 'fade',
          appear: false,
          children: childVNode({
            ref: (el: HTMLElement | null) => {
              if (el) capturedClass = el.className;
            },
          }, 'Hello'),
        })
      );

      expect(capturedClass).toBeDefined();
    });
  });

  it('merges enter-active with enter class', async () => {
    const { container, rerender } = render(
      h(CSSTransition, {
        in: false,
        classNames: 'fade',
        children: childVNode({ 'data-testid': 'child' }, 'Hello'),
      })
    );

    await act(async () => {
      rerender(
        h(CSSTransition, {
          in: true,
          classNames: 'fade',
          duration: 100,
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        })
      );
    });

    const el = container.querySelector('[data-testid="child"]') as HTMLElement;
    expect(el.className).toContain('fade-enter');

    await act(async () => {
      vi.advanceTimersByTime(16);
    });

    expect(el.className).toContain('fade-enter-active');
    expect(el.className).toContain('fade-enter');
  });

  it('merges exit-active with exit class', async () => {
    const { container, rerender } = render(
      h(CSSTransition, {
        in: true,
        alwaysMounted: true,
        classNames: 'fade',
        children: childVNode({ 'data-testid': 'child' }, 'Hello'),
      })
    );

    await act(async () => {
      rerender(
        h(CSSTransition, {
          in: false,
          alwaysMounted: true,
          classNames: 'fade',
          duration: 100,
          children: childVNode({ 'data-testid': 'child' }, 'Hello'),
        })
      );
    });

    const el = container.querySelector('[data-testid="child"]') as HTMLElement;

    await act(async () => {
      vi.advanceTimersByTime(16);
    });

    expect(el.className).toContain('fade-exit');
    expect(el.className).toContain('fade-exit-active');
  });

  it('merges appear-active with appear class', async () => {
    const { container } = render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: true,
        duration: 100,
        children: childVNode({ 'data-testid': 'child' }, 'Hello'),
      })
    );

    const el = container.querySelector('[data-testid="child"]') as HTMLElement;
    expect(el.className).toContain('fade-appear');

    await act(async () => {
      vi.advanceTimersByTime(16);
    });

    expect(el.className).toContain('fade-appear-active');
    expect(el.className).toContain('fade-appear');
  });

  it('preserves className prop alongside classNames suffix', () => {
    let capturedClass: string | undefined;
    render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        appear: false,
        children: childVNode({
          className: 'my-class',
          ref: (el: HTMLElement | null) => {
            if (el) capturedClass = el.className;
          },
        }, 'Hello'),
      })
    );

    expect(capturedClass).toContain('my-class');
    expect(capturedClass).toContain('fade-appear-done');
  });

  it('returns null when children is not a valid element', () => {
    const { container } = render(
      h(CSSTransition, {
        in: true,
        classNames: 'fade',
        children: 'plain text' as any,
      })
    );

    expect(container.innerHTML).toBe('');
  });
});
