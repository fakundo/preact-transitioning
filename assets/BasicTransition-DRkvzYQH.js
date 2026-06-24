import"./index-LEj95BT6.js";import{u as e}from"./jsxRuntime.module-CFb5ymYX.js";import{useMDXComponents as o}from"./index-DsvevKGP.js";import{M as r,C as c}from"./index-Di39pTIM.js";import{Default as a}from"./BasicTransition.stories-C5hgPmsL.js";import{k as l}from"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./iframe-DNAYbGTO.js";import"./index-DrFu-skq.js";import"./CSSTransition-Dc13Bty9.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...i.components};return e(l,{children:[e(r,{title:"Examples/Basic Transition"}),`
`,e(n.h1,{id:"basic-transition-example",children:"Basic Transition Example"}),`
`,e(n.p,{children:["This example demonstrates how to use the ",e(n.code,{children:"Transition"})," component to handle simple transitions. The ",e(n.code,{children:"Transition"})," component provides information about its current state, which can be used to apply animations or styles dynamically."]}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.p,{children:["Here’s how you can use the ",e(n.code,{children:"Transition"})," component in your project:"]}),`
`,e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<Transition in={visible}>
  {transitionState => <pre>{JSON.stringify(transitionState)}</pre>}
</Transition>
`})}),`
`,e(n.h2,{id:"explanation",children:"Explanation"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"in"}),": A boolean that determines whether the transition is entering or exiting."]}),`
`,e(n.li,{children:[e(n.code,{children:"transitionState"}),": An object that represents the current state of the transition, with boolean flags for each phase: ",e(n.code,{children:"appear"}),", ",e(n.code,{children:"appearActive"}),", ",e(n.code,{children:"appearDone"}),", ",e(n.code,{children:"enter"}),", ",e(n.code,{children:"enterActive"}),", ",e(n.code,{children:"enterDone"}),", ",e(n.code,{children:"exit"}),", ",e(n.code,{children:"exitActive"}),", ",e(n.code,{children:"exitDone"}),"."]}),`
`]}),`
`,e(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e(n.p,{children:["Check out the live demo below to see the ",e(n.code,{children:"Transition"})," component in action:"]}),`
`,e(c,{of:a}),`
`,e(n.h2,{id:"source-code",children:"Source Code"}),`
`,e(n.p,{children:["The source code for this example is available on ",e(n.a,{href:"https://github.com/fakundo/preact-transitioning/blob/main/stories/examples/BasicTransition.stories.tsx",rel:"nofollow",children:"GitHub"}),"."]})]})}function g(i={}){const{wrapper:n}={...o(),...i.components};return n?e(n,{...i,children:e(t,{...i})}):t(i)}export{g as default};
