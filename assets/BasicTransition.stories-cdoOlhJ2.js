import{u as t}from"./jsxRuntime.module-CFb5ymYX.js";import{d as s}from"./hooks.module-Bqmbac_-.js";import{T as a}from"./CSSTransition-D2FYEyZ0.js";import{k as u}from"./preact.module-CLNnjL5T.js";const m={tags:["!dev"]},e={render:()=>{const[o,n]=s(!0),[i,l]=s(!0);return t(u,{children:[t("div",{className:"group",children:[t("button",{onClick:()=>n(!o),type:"button",children:"Toggle visibility"}),t("label",{children:[t("input",{type:"checkbox",checked:i,onChange:()=>l(!i)}),"Always mounted"]})]}),t("hr",{}),t(a,{in:o,alwaysMounted:i,children:r=>t("pre",{children:JSON.stringify(r,null,"  ")})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [visible, setVisible] = useState(true);
    const [alwaysMounted, setAlwaysMounted] = useState(true);
    const toggleVisibility = () => setVisible(!visible);
    const toggleAlwaysMounted = () => setAlwaysMounted(!alwaysMounted);
    return <>
        <div className="group">
          <button onClick={toggleVisibility} type="button">
            Toggle visibility
          </button>
          <label>
            <input type="checkbox" checked={alwaysMounted} onChange={toggleAlwaysMounted} />
            Always mounted
          </label>
        </div>
        <hr />
        <Transition in={visible} alwaysMounted={alwaysMounted}>
          {transitionState => <pre>{JSON.stringify(transitionState, null, '  ')}</pre>}
        </Transition>
      </>;
  }
}`,...e.parameters?.docs?.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,m as default};
