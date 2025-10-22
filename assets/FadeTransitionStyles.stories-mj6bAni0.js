import{u as e}from"./jsxRuntime.module-CFb5ymYX.js";import{d as o}from"./hooks.module-Bqmbac_-.js";import{F as s}from"./StyleFadeTransition-AHBQhhvc.js";import{k as a}from"./preact.module-CLNnjL5T.js";import"./CSSTransition-D2FYEyZ0.js";import"./StyleTransition-ktvKYcXb.js";const m={tags:["!dev"]},t={render:()=>{const[r,i]=o(!0);return e(a,{children:[e("button",{onClick:()=>i(!r),type:"button",children:"Toggle visibility"}),e("hr",{}),e(s,{in:r,alwaysMounted:!0,children:e("div",{style:{width:100,height:100,borderRadius:"15%",background:"linear-gradient(to bottom right, seagreen, teal)"}})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,m as default};
