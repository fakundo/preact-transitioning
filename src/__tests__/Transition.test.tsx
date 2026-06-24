import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import { h } from 'preact';
import { Transition, Phase, TransitionState } from '../Transition';

describe('Transition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders children when in=true', () => {
    const { container } = render(
      h(Transition, {
        in: true,
        children: () => h('div', { 'data-testid': 'child' }, 'Hello'),
      })
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('does not render when in=false and exit completes', () => {
    const { container } = render(
      h(Transition, {
        in: false,
        children: () => h('div', { 'data-testid': 'child' }, 'Hello'),
      })
    );
    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('renders when in=false with alwaysMounted', () => {
    const { container } = render(
      h(Transition, {
        in: false,
        alwaysMounted: true,
        children: () => h('div', { 'data-testid': 'child' }, 'Hello'),
      })
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('starts in APPEAR phase when appear=true', () => {
    let capturedPhase: Phase | undefined;
    render(
      h(Transition, {
        in: true,
        appear: true,
        children: (_state: TransitionState, phase: Phase) => {
          capturedPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );
    expect(capturedPhase).toBe(Phase.APPEAR);
  });

  it('starts in APPEAR_DONE when appear=false', () => {
    let capturedPhase: Phase | undefined;
    render(
      h(Transition, {
        in: true,
        appear: false,
        children: (_state: TransitionState, phase: Phase) => {
          capturedPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );
    expect(capturedPhase).toBe(Phase.APPEAR_DONE);
  });

  it('calls onEnter when transitioning from exit to enter', () => {
    const onEnter = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: false,
        onEnter,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: true,
        onEnter,
        children: () => h('div', null, 'Hello'),
      })
    );

    expect(onEnter).toHaveBeenCalled();
  });

  it('calls onEntered callback after enter completes', () => {
    const onEntered = vi.fn();
    render(
      h(Transition, {
        in: true,
        duration: 100,
        onEntered,
        children: () => h('div', null, 'Hello'),
      })
    );

    vi.advanceTimersByTime(200);
    expect(onEntered).toHaveBeenCalled();
  });

  it('does not run enter when enter=false', () => {
    const onEnter = vi.fn();
    let capturedPhase: Phase | undefined;
    render(
      h(Transition, {
        in: true,
        enter: false,
        onEnter,
        children: (_state: TransitionState, phase: Phase) => {
          capturedPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );
    expect(capturedPhase).toBe(Phase.APPEAR_DONE);
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('does not render after exit completes when exit=false', () => {
    const { container, rerender } = render(
      h(Transition, {
        in: true,
        exit: false,
        children: () => h('div', { 'data-testid': 'child' }, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        exit: false,
        children: () => h('div', { 'data-testid': 'child' }, 'Hello'),
      })
    );

    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });

  it('provides correct transitionState', () => {
    let state: TransitionState | undefined;
    render(
      h(Transition, {
        in: true,
        children: (transitionState: TransitionState) => {
          state = transitionState;
          return h('div', null, 'Hello');
        },
      })
    );

    expect(state).toBeDefined();
    expect(state![Phase.APPEAR_DONE]).toBe(true);
    expect(state![Phase.ENTER]).toBe(false);
    expect(state![Phase.EXIT]).toBe(false);
  });

  it('cleans up timers on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const { unmount } = render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 1000,
        children: () => h('div', null, 'Hello'),
      })
    );

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it('does not call setPhase after unmount (destroyedRef guard)', () => {
    const onEntering = vi.fn();

    const { unmount } = render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 50,
        onEntering,
        children: () => h('div', null, 'Hello'),
      })
    );

    unmount();
    vi.advanceTimersByTime(100);

    expect(onEntering).not.toHaveBeenCalled();
  });

  it('calls onExit when transitioning from enter to exit', () => {
    const onExit = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: true,
        onExit,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        onExit,
        children: () => h('div', null, 'Hello'),
      })
    );

    expect(onExit).toHaveBeenCalled();
  });

  it('calls onExiting during exit phase', async () => {
    const onExiting = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: true,
        duration: 100,
        onExiting,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        duration: 100,
        onExiting,
        children: () => h('div', null, 'Hello'),
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(onExiting).toHaveBeenCalled();
  });

  it('calls onExited after exit completes', async () => {
    const onExited = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: true,
        duration: 100,
        onExited,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        duration: 100,
        onExited,
        children: () => h('div', null, 'Hello'),
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(onExited).toHaveBeenCalled();
  });

  it('does not run exit when exit=false', () => {
    const onExit = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: true,
        exit: false,
        onExit,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        exit: false,
        onExit,
        children: () => h('div', null, 'Hello'),
      })
    );

    expect(onExit).not.toHaveBeenCalled();
  });

  it('calls addEndListener when provided', () => {
    const addEndListener = vi.fn((_node: any, done: () => void) => {
      done();
    });
    let capturedPhase: Phase | undefined;

    render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 100,
        addEndListener,
        children: (_state: TransitionState, phase: Phase) => {
          capturedPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );

    expect(capturedPhase).toBe(Phase.APPEAR);
    expect(addEndListener).not.toHaveBeenCalled();
  });

  it('addEndListener done() advances to next phase', async () => {
    let capturedPhase: Phase | undefined;
    const addEndListener = vi.fn((_node: any, done: () => void) => {
      done();
    });

    render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 100,
        addEndListener,
        children: (_state: TransitionState, phase: Phase) => {
          capturedPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );

    expect(capturedPhase).toBe(Phase.APPEAR);
    await vi.advanceTimersByTimeAsync(100);
    expect(capturedPhase).toBe(Phase.APPEAR_DONE);
    expect(addEndListener).toHaveBeenCalled();
  });

  it('goes through full appear phase cycle', async () => {
    const phases: Phase[] = [];
    render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          phases.push(phase);
          return h('div', null, 'Hello');
        },
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(phases).toContain(Phase.APPEAR);
    expect(phases).toContain(Phase.APPEAR_ACTIVE);
    expect(phases).toContain(Phase.APPEAR_DONE);
    expect(phases[phases.length - 1]).toBe(Phase.APPEAR_DONE);
  });

  it('goes through full enter phase cycle when in toggles true', async () => {
    const phases: Phase[] = [];
    const { rerender } = render(
      h(Transition, {
        in: false,
        children: (_state: TransitionState, phase: Phase) => {
          phases.push(phase);
          return h('div', null, 'Hello');
        },
      })
    );

    phases.length = 0;

    rerender(
      h(Transition, {
        in: true,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          phases.push(phase);
          return h('div', null, 'Hello');
        },
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(phases).toContain(Phase.ENTER);
    expect(phases).toContain(Phase.ENTER_ACTIVE);
    expect(phases).toContain(Phase.ENTER_DONE);
    expect(phases[phases.length - 1]).toBe(Phase.ENTER_DONE);
  });

  it('goes through full exit phase cycle when in toggles false', async () => {
    const phases: Phase[] = [];
    const { rerender } = render(
      h(Transition, {
        in: true,
        alwaysMounted: true,
        children: (_state: TransitionState, phase: Phase) => {
          phases.push(phase);
          return h('div', null, 'Hello');
        },
      })
    );

    phases.length = 0;

    rerender(
      h(Transition, {
        in: false,
        alwaysMounted: true,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          phases.push(phase);
          return h('div', null, 'Hello');
        },
      })
    );

    await vi.advanceTimersByTimeAsync(500);
    expect(phases).toContain(Phase.EXIT);
    expect(phases).toContain(Phase.EXIT_ACTIVE);
    expect(phases).toContain(Phase.EXIT_DONE);
    expect(phases[phases.length - 1]).toBe(Phase.EXIT_DONE);
  });

  it('handles rapid in toggle without getting stuck', async () => {
    let lastPhase: Phase | undefined;
    const { rerender } = render(
      h(Transition, {
        in: true,
        appear: true,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          lastPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );

    rerender(
      h(Transition, {
        in: false,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          lastPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );

    rerender(
      h(Transition, {
        in: true,
        duration: 50,
        children: (_state: TransitionState, phase: Phase) => {
          lastPhase = phase;
          return h('div', null, 'Hello');
        },
      })
    );

    await vi.advanceTimersByTimeAsync(1000);
    expect(lastPhase).toBeDefined();
    expect([Phase.ENTER_DONE, Phase.ENTER_ACTIVE, Phase.ENTER]).toContain(lastPhase);
  });

  it('requestAnimationFrame path advances non-delay phases', async () => {
    const onExiting = vi.fn();
    const { rerender } = render(
      h(Transition, {
        in: true,
        onExiting,
        children: () => h('div', null, 'Hello'),
      })
    );

    rerender(
      h(Transition, {
        in: false,
        duration: 100,
        onExiting,
        children: () => h('div', null, 'Hello'),
      })
    );

    expect(onExiting).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(100);
    expect(onExiting).toHaveBeenCalled();
  });
});
