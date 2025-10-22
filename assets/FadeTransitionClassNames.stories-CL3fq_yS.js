import{u as e}from"./jsxRuntime.module-CFb5ymYX.js";import{d as o}from"./hooks.module-Bqmbac_-.js";import{k as s}from"./preact.module-CLNnjL5T.js";import{C as n}from"./CSSTransition-D2FYEyZ0.js";function a(t){return e(n,{...t,classNames:"fade"})}const c={tags:["!dev"]},r={render:()=>{const[t,i]=o(!0);return e(s,{children:[e("button",{onClick:()=>i(!t),type:"button",children:"Toggle visibility"}),e("hr",{}),e(a,{in:t,alwaysMounted:!0,children:e("div",{style:{width:100,height:100,borderRadius:"15%",background:"linear-gradient(to bottom right, seagreen, teal)"}})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [visible, setVisible] = useState(true);
    return <>
        <button onClick={() => setVisible(!visible)} type="button">
          Toggle visibility
        </button>
        <hr />
        <FadeTransition in={visible} alwaysMounted>
          <div style={{
          width: 100,
          height: 100,
          borderRadius: '15%',
          background: 'linear-gradient(to bottom right, seagreen, teal)'
        }} />
        </FadeTransition>
      </>;
  }
}`,...r.parameters?.docs?.source}}};const g=["Default"];export{r as Default,g as __namedExportsOrder,c as default};
