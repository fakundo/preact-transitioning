import{u as e}from"./jsxRuntime.module-CFb5ymYX.js";import"./preact.module-CLNnjL5T.js";import"./hooks.module-Bqmbac_-.js";import"./CSSTransition-D2FYEyZ0.js";import{T as r}from"./TransitionGroup-BnkI5oRw.js";import{F as n}from"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";const i="The `TransitionGroup` component handles a collection of `Transition` child elements\nand applies transition animations when elements enter and exit the DOM.\nIt can be used to animate multiple elements, controlling their appearance and removal in a container.",o={children:{control:!1,name:"children",description:"The child elements that the transition animation will be applied to.\nEach valid child must have a unique `key` prop to ensure correct transition behavior.",type:{name:"ComponentChildren",required:!0},table:{defaultValue:null}},appear:{control:null,name:"appear",description:`A boolean indicating whether the children should transition through the "appear"
phase when the component is first mounted.`,type:{name:"boolean",required:!1},table:{defaultValue:{summary:"false"}}},enter:{control:null,name:"enter",description:`A boolean indicating whether the children should transition through the "enter"
phases when they are added to the DOM.`,type:{name:"boolean",required:!1},table:{defaultValue:{summary:"true"}}},exit:{control:null,name:"exit",description:`A boolean indicating whether the children should transition through the "exit"
phases when they are removed from the DOM.`,type:{name:"boolean",required:!1},table:{defaultValue:{summary:"true"}}},duration:{control:null,name:"duration",description:`The duration of the transition in milliseconds. This value can be used to set the
transition duration for all children in the group.`,type:{name:"number",required:!1},table:{defaultValue:{summary:"DEFAULT_TRANSITION_DURATION=500"}}}},m={title:"Components/TransitionGroup",component:r,tags:["autodocs"],parameters:{docs:{description:{component:i}}},argTypes:o,args:{appear:!0}},t={render:a=>e("div",{style:{display:"flex",gap:".25rem"},children:e(r,{...a,children:[e(n,{children:e("div",{style:{width:100,height:100,borderRadius:"15%",background:"linear-gradient(to bottom right, seagreen, teal)"}})},"0"),e(n,{children:e("div",{style:{width:100,height:100,borderRadius:"15%",background:"linear-gradient(to bottom right, blueviolet, cornflowerblue)"}})},"1")]})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: '.25rem'
  }}>
      <TransitionGroup {...args}>
        <FadeTransition key="0">
          <div style={{
          width: 100,
          height: 100,
          borderRadius: '15%',
          background: 'linear-gradient(to bottom right, seagreen, teal)'
        }} />
        </FadeTransition>
        <FadeTransition key="1">
          <div style={{
          width: 100,
          height: 100,
          borderRadius: '15%',
          background: 'linear-gradient(to bottom right, blueviolet, cornflowerblue)'
        }} />
        </FadeTransition>
      </TransitionGroup>
    </div>
}`,...t.parameters?.docs?.source}}};const g=["Playground"];export{t as Playground,g as __namedExportsOrder,m as default};
