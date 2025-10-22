import { CSSTransition, CSSTransitionProps } from 'preact-transitioning';
import './CSSFadeTransition.css';

export type FadeTransitionProps = Omit<CSSTransitionProps, 'classNames'>;

export function FadeTransition(props: FadeTransitionProps) {
  return <CSSTransition {...props} classNames="fade" />;
}
