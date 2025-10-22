import"./index-LEj95BT6.js";import{u as n}from"./jsxRuntime.module-CFb5ymYX.js";import{useMDXComponents as a}from"./index-DsvevKGP.js";import{M as r,S as o,C as s}from"./index-B2e_H_qW.js";import{Default as c}from"./FadeTransitionClassNames.stories-CL3fq_yS.js";import{k as d}from"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./iframe-BMxGqmmI.js";import"./index-DrFu-skq.js";import"./CSSTransition-D2FYEyZ0.js";const l=`import { CSSTransition, CSSTransitionProps } from 'preact-transitioning';
import './CSSFadeTransition.css';

export type FadeTransitionProps = Omit<CSSTransitionProps, 'classNames'>;

export function FadeTransition(props: FadeTransitionProps) {
  return <CSSTransition {...props} classNames="fade" />;
}
`,h=`.fade-appear {
  opacity: 0;
}
.fade-appear-active {
  opacity: 1;
  transition: opacity 500ms;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 500ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 500ms;
}
.fade-exit-done {
  opacity: 0;
}
`;function t(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...i.components};return n(d,{children:[n(r,{title:"Examples/Fade Transition/Class Names"}),`
`,n(e.h1,{id:"fade-transition-with-class-names",children:"Fade Transition with Class Names"}),`
`,n(e.p,{children:["This example demonstrates how to create a fade transition using the ",n(e.code,{children:"CSSTransition"})," component with class names for styling."]}),`
`,n(e.h2,{id:"code-example",children:"Code Example"}),`
`,n(e.p,{children:["Example implementation of the ",n(e.code,{children:"FadeTransition"})," component:"]}),`
`,n(o,{code:l,language:"tsx",dark:!0}),`
`,n(e.p,{children:["Contents of the file ",n(e.code,{children:"CSSFadeTransition.css"}),":"]}),`
`,n(o,{code:h,language:"css",dark:!0}),`
`,n(e.h2,{id:"explanation",children:"Explanation"}),`
`,n(e.p,{children:["The example implements a fading transition effect using the ",n(e.code,{children:"StyleTransition"})," component. Below are the key points:"]}),`
`,n(e.ol,{children:[`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"CSS Classes for Animation"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["The ",n(e.code,{children:"classNames"})," prop defines the base name for the transition classes (e.g., ",n(e.code,{children:"fade"}),")."]}),`
`,n(e.li,{children:[n(e.code,{children:"CSSTransition"})," automatically appends suffixes like ",n(e.code,{children:"-enter"}),", ",n(e.code,{children:"-enter-active"}),", ",n(e.code,{children:"-exit"}),", and ",n(e.code,{children:"-exit-active"})," to match the different transition phases."]}),`
`]}),`
`]}),`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"Transition Control"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["The ",n(e.code,{children:"in"})," prop toggles the visibility of the component and triggers the appropriate CSS animations (e.g., enter/exit)."]}),`
`]}),`
`]}),`
`,n(e.li,{children:[`
`,n(e.p,{children:[n(e.strong,{children:"Reusability"}),":"]}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:["By encapsulating logic into a ",n(e.code,{children:"FadeTransition"})," component, you can easily reuse fade animations across your project."]}),`
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
`,n(s,{of:c}),`
`,n(e.h2,{id:"source-code",children:"Source Code"}),`
`,n(e.p,{children:["The source code for this example is available on ",n(e.a,{href:"https://github.com/fakundo/preact-transitioning/blob/main/stories/examples/FadeTransitionClassNames.stories.tsx",rel:"nofollow",children:"GitHub"}),"."]})]})}function F(i={}){const{wrapper:e}={...a(),...i.components};return e?n(e,{...i,children:n(t,{...i})}):t(i)}export{F as default};
