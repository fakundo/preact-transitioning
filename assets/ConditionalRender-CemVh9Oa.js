import"./index-LEj95BT6.js";import{u as n}from"./jsxRuntime.module-CFb5ymYX.js";import{useMDXComponents as r}from"./index-DsvevKGP.js";import{M as t,C as d}from"./index-B2e_H_qW.js";import{Default as l}from"./ConditionalRender.stories-YiB0ikm1.js";import{k as a}from"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./iframe-BMxGqmmI.js";import"./index-DrFu-skq.js";import"./CSSTransition-D2FYEyZ0.js";import"./TransitionGroup-BnkI5oRw.js";import"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";function o(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return n(a,{children:[n(t,{title:"Examples/Transition Group/Conditional Render"}),`
`,n(e.h1,{id:"transition-group--conditional-render-example",children:"Transition Group – Conditional Render Example"}),`
`,n(e.p,{children:["This example demonstrates how to use the ",n(e.code,{children:"TransitionGroup"})," component with conditionally rendered children. By leveraging ",n(e.code,{children:"TransitionGroup"}),", you can easily handle animations for elements that are dynamically added or removed based on conditions."]}),`
`,n(e.h2,{id:"usage",children:"Usage"}),`
`,n(e.p,{children:["To use the ",n(e.code,{children:"TransitionGroup"})," with conditionally rendered children in your project, follow the example below:"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`<TransitionGroup>
  {shouldRenderFirstElement && (
    <FadeTransition key="1">
      <div>First element</div>
    </FadeTransition>
  )}
  {shouldRenderSecondElement && (
    <FadeTransition key="2">
      <div>Second element</div>
    </FadeTransition>
  )}
</TransitionGroup>
`})}),`
`,n(e.h2,{id:"explanation",children:"Explanation"}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:[n(e.strong,{children:[n(e.code,{children:"shouldRenderFirstElement"})," and ",n(e.code,{children:"shouldRenderSecondElement"})]}),": These are boolean conditions controlling whether specific elements should appear or disappear."]}),`
`,n(e.li,{children:[n(e.strong,{children:n(e.code,{children:"FadeTransition"})}),": Wraps each child with animations for entering and exiting phases."]}),`
`,n(e.li,{children:[n(e.strong,{children:n(e.code,{children:"TransitionGroup"})}),": Handles the mounting and unmounting of its children with smooth transitions."]}),`
`]}),`
`,n(e.h2,{id:"live-demo",children:"Live Demo"}),`
`,n(e.p,{children:["Check out the live demo below to see the ",n(e.code,{children:"TransitionGroup"})," in action with conditionally rendered children:"]}),`
`,n(d,{of:l}),`
`,n(e.h2,{id:"source-code",children:"Source Code"}),`
`,n(e.p,{children:["The source code for this example is available on ",n(e.a,{href:"https://github.com/fakundo/preact-transitioning/blob/main/stories/examples/ConditionalRender.stories.tsx",rel:"nofollow",children:"GitHub"}),"."]})]})}function C(i={}){const{wrapper:e}={...r(),...i.components};return e?n(e,{...i,children:n(o,{...i})}):o(i)}export{C as default};
