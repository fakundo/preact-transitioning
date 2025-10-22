import { useMemo } from 'preact/hooks';
import { StyleTransition, StyleTransitionProps, DEFAULT_TRANSITION_DURATION } from 'preact-transitioning';

export type FadeTransitionProps = Omit<StyleTransitionProps, 'styles'>;

export function FadeTransition(props: FadeTransitionProps) {
  const { duration = DEFAULT_TRANSITION_DURATION } = props;

  const styles = useMemo(
    () => ({
      appear: { opacity: 0 },
      appearActive: { opacity: 1, transition: `opacity ${duration}ms` },
      enter: { opacity: 0 },
      enterActive: { opacity: 1, transition: `opacity ${duration}ms` },
      exit: { opacity: 1 },
      exitActive: { opacity: 0, transition: `opacity ${duration}ms` },
      exitDone: { opacity: 0 },
    }),
    [duration],
  );

  return <StyleTransition {...props} styles={styles} />;
}
