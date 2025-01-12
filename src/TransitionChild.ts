import { Component, ComponentChildren, createElement, Fragment } from 'preact';
import { useRef } from 'preact/hooks';

type TransitionChildProps = {
  nodeRef: ReturnType<typeof useRef<Element | Text>>;
  children: ComponentChildren;
};

export class TransitionChild extends Component<TransitionChildProps> {
  componentDidMount() {
    const { nodeRef } = this.props;
    nodeRef.current = this.base;
  }

  componentWillUnmount() {
    const { nodeRef } = this.props;
    nodeRef.current = undefined;
  }

  render() {
    const { children } = this.props;
    return createElement(Fragment, {}, children);
  }
}
