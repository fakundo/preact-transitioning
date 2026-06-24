import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import { h, VNode } from 'preact';
import { StyleTransition } from '../StyleTransition';
import { Phase } from '../Transition';

type ChildProps = { style?: any };

const childVNode = (props: Record<string, any>, ...children: any[]): VNode<ChildProps> =>
  h('div', props as ChildProps, ...children) as VNode<ChildProps>;

describe('StyleTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('applies styles based on current phase', () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        styles: {
          [Phase.APPEAR_DONE]: { opacity: 1 },
        },
        appear: false,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
    expect(capturedStyle!.opacity).toBe('1');
  });

  it('merges enter-active with enter styles', () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        styles: {
          [Phase.APPEAR]: { opacity: 0 },
          [Phase.APPEAR_ACTIVE]: { opacity: 0.5 },
        },
        appear: false,
        duration: 100,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
  });

  it('preserves existing style on child', () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        styles: {
          [Phase.APPEAR_DONE]: { opacity: 1 },
        },
        appear: false,
        children: childVNode({
          style: { color: 'red' },
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
    expect(capturedStyle!.opacity).toBe('1');
  });

  it('returns null for invalid children', () => {
    const { container } = render(
      h(StyleTransition, {
        in: true,
        styles: {},
        children: null as any,
      })
    );

    expect(container.innerHTML).toBe('');
  });

  it('applies appear styles when appear=true', () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        styles: {
          [Phase.APPEAR_DONE]: { transform: 'scale(1)' },
        },
        appear: true,
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
  });

  it('merges enter-active with enter styles', async () => {
    let capturedStyle: Record<string, any> | undefined;
    const { rerender } = render(
      h(StyleTransition, {
        in: false,
        styles: {
          [Phase.ENTER]: { opacity: 0 },
          [Phase.ENTER_ACTIVE]: { opacity: 0.5 },
        },
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    rerender(
      h(StyleTransition, {
        in: true,
        duration: 100,
        styles: {
          [Phase.ENTER]: { opacity: 0 },
          [Phase.ENTER_ACTIVE]: { opacity: 0.5 },
        },
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
    await vi.advanceTimersByTimeAsync(16);
    expect(capturedStyle!.opacity).toBe('0.5');
  });

  it('merges exit-active with exit styles', async () => {
    let capturedStyle: Record<string, any> | undefined;
    const { rerender } = render(
      h(StyleTransition, {
        in: true,
        alwaysMounted: true,
        styles: {
          [Phase.EXIT]: { opacity: 1 },
          [Phase.EXIT_ACTIVE]: { opacity: 0.5 },
        },
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    rerender(
      h(StyleTransition, {
        in: false,
        alwaysMounted: true,
        duration: 100,
        styles: {
          [Phase.EXIT]: { opacity: 1 },
          [Phase.EXIT_ACTIVE]: { opacity: 0.5 },
        },
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    await vi.advanceTimersByTimeAsync(16);
    expect(capturedStyle!.opacity).toBe('0.5');
  });

  it('merges appear-active with appear styles', async () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        appear: true,
        duration: 100,
        styles: {
          [Phase.APPEAR]: { opacity: 0 },
          [Phase.APPEAR_ACTIVE]: { opacity: 0.5 },
        },
        children: childVNode({
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle).toBeDefined();
    await vi.advanceTimersByTimeAsync(16);
    expect(capturedStyle!.opacity).toBe('0.5');
  });

  it('preserves child style alongside phase styles', () => {
    let capturedStyle: Record<string, any> | undefined;
    render(
      h(StyleTransition, {
        in: true,
        appear: false,
        styles: {
          [Phase.APPEAR_DONE]: { opacity: 1 },
        },
        children: childVNode({
          style: { color: 'red', fontSize: '14px' },
          ref: (el: HTMLElement | null) => {
            if (el) capturedStyle = el.style as any;
          },
        }, 'Hello'),
      })
    );

    expect(capturedStyle!.opacity).toBe('1');
    expect(capturedStyle!.color).toBe('red');
    expect(capturedStyle!.fontSize).toBe('14px');
  });
});
