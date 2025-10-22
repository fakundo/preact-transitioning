import"./index-LEj95BT6.js";import{u as e}from"./jsxRuntime.module-CFb5ymYX.js";import{useMDXComponents as t}from"./index-DsvevKGP.js";import{M as r,C as a}from"./index-B2e_H_qW.js";import{Default as m}from"./ItemList.stories-DyPuWYKE.js";import{k as s}from"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./iframe-BMxGqmmI.js";import"./index-DrFu-skq.js";import"./CSSTransition-D2FYEyZ0.js";import"./TransitionGroup-BnkI5oRw.js";import"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";function i(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...t(),...o.components};return e(s,{children:[e(r,{title:"Examples/Transition Group/Item List"}),`
`,e(n.h1,{id:"transition-group--item-list-example",children:"Transition Group – Item List Example"}),`
`,e(n.p,{children:["This example demonstrates how to use the ",e(n.code,{children:"TransitionGroup"})," component with an array of items to manage animations when adding or removing elements."]}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.p,{children:["To use the ",e(n.code,{children:"TransitionGroup"})," in your project, you can follow the example below:"]}),`
`,e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<TransitionGroup>
  {items.map((item) => (
    <FadeTransition key={item.id}>
      <div>{item.content}</div>
    </FadeTransition>
  ))}
</TransitionGroup>
`})}),`
`,e(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e(n.p,{children:["Check out the live demo below to see the ",e(n.code,{children:"TransitionGroup"})," in action:"]}),`
`,e(a,{of:m}),`
`,e(n.h2,{id:"source-code",children:"Source Code"}),`
`,e(n.p,{children:["The source code for this example is available on ",e(n.a,{href:"https://github.com/fakundo/preact-transitioning/blob/main/stories/examples/ItemList.stories.tsx",rel:"nofollow",children:"GitHub"}),"."]})]})}function b(o={}){const{wrapper:n}={...t(),...o.components};return n?e(n,{...o,children:e(i,{...o})}):i(o)}export{b as default};
