import"./index-LEj95BT6.js";import{u as n}from"./jsxRuntime.module-CFb5ymYX.js";import{useMDXComponents as o}from"./index-DsvevKGP.js";import{M as r,S as a,C as s}from"./index-B2e_H_qW.js";import{Default as l}from"./FadeTransitionStyles.stories-mj6bAni0.js";import{k as c}from"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./iframe-BMxGqmmI.js";import"./index-DrFu-skq.js";import"./StyleFadeTransition-AHBQhhvc.js";import"./CSSTransition-D2FYEyZ0.js";import"./StyleTransition-ktvKYcXb.js";const d=`import { useMemo } from 'preact/hooks';
import { StyleTransition, StyleTransitionProps, DEFAULT_TRANSITION_DURATION } from 'preact-transitioning';

export type FadeTransitionProps = Omit<StyleTransitionProps, 'styles'>;

export function FadeTransition(props: FadeTransitionProps) {
  const { duration = DEFAULT_TRANSITION_DURATION } = props;

  const styles = useMemo(
    () => ({
      appear: { opacity: 0 },
      appearActive: { opacity: 1, transition: \`opacity \${duration}ms\` },
      enter: { opacity: 0 },
      enterActive: { opacity: 1, transition: \`opacity \${duration}ms\` },
      exit: { opacity: 1 },
      exitActive: { opacity: 0, transition: \`opacity \${duration}ms\` },
      exitDone: { opacity: 0 },
    }),
    [duration],
  );

  return <StyleTransition {...props} styles={styles} />;
}
`;function t(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return n(c,{children:[n(r,{title:"Examples/Fade Transition/Inline Styles"}),`
`,n(e.h1,{id:"fade-transition-with-inline-styles",children:"Fade Transition with Inline Styles"}),`
`,n(e.p,{children:["This example demonstrates how to create a fade transition using the ",n(e.code,{children:"StyleTransition"})," component with custom inline styles."]}),`
`,n(e.h2,{id:"code-example",children:"Code Example"}),`
`,n(e.p,{children:["Example implementation of the ",n(e.code,{children:"FadeTransition"})," component:"]}),`
`,n(a,{code:d,language:"tsx",dark:!0}),`
`,n(e.h2,{id:"explanation",children:"Explanation"}),`
`,n(e.p,{children:["The example implements a fading transition effect using the ",n(e.code,{children:"StyleTransition"})," component. Below are the key points:"]}),`
`,n(e.ol,{children:[`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"Custom Inline Styles"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:"Inline styles are used to define the appearance for different phases of the transition (e.g., enter, exit)."}),`
`,n(e.li,{children:"This allows you to avoid external CSS files and keep styles self-contained."}),`
`]}),`
`]}),`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"Transition Control"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["The ",n(e.code,{children:"in"})," prop determines whether the component is visible or not, triggering the appropriate transition (enter/exit)."]}),`
`]}),`
`]}),`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"Reusability"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["By wrapping the logic inside a reusable ",n(e.code,{children:"FadeTransition"})," component, you can easily integrate fade animations across your project."]}),`
`]}),`
`]}),`
`]}),`
`,n(e.h2,{id:"usage",children:"Usage"}),`
`,n(e.p,{children:["You can then use the ",n(e.code,{children:"FadeTransition"})," component in your project like this:"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`<FadeTransition in={visible}>
  <div>Fading element</div>
</FadeTransition>
`})}),`
`,n(e.h2,{id:"live-demo",children:"Live Demo"}),`
`,n(e.p,{children:["Check out the live demo below to see the ",n(e.code,{children:"FadeTransition"})," in action:"]}),`
`,n(s,{of:l}),`
`,n(e.h2,{id:"source-code",children:"Source Code"}),`
`,n(e.p,{children:["The source code for this example is available on ",n(e.a,{href:"https://github.com/fakundo/preact-transitioning/blob/main/stories/examples/FadeTransitionStyles.stories.tsx",rel:"nofollow",children:"GitHub"}),"."]})]})}function C(i={}){const{wrapper:e}={...o(),...i.components};return e?n(e,{...i,children:n(t,{...i})}):t(i)}export{C as default};
