import{u as t}from"./jsxRuntime.module-CFb5ymYX.js";import{d as o}from"./hooks.module-Bqmbac_-.js";import{k as h}from"./preact.module-CLNnjL5T.js";import"./CSSTransition-D2FYEyZ0.js";import{T as l}from"./TransitionGroup-BnkI5oRw.js";import{F as n}from"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";const v={tags:["!dev"]},e={render:()=>{const[i,d]=o(!0),[r,m]=o(!0),[s,c]=o(!1);return t(h,{children:[t("div",{className:"group",children:[t("button",{onClick:()=>d(!i),type:"button",children:"Toggle first item"}),t("button",{onClick:()=>m(!r),type:"button",children:"Toggle second item"}),t("button",{onClick:()=>c(!s),type:"button",children:"Toggle third item"})]}),t("hr",{}),t(l,{children:[i&&t(n,{children:t("div",{children:"First item"})},"1"),r&&t(n,{children:t("div",{children:"Second item"})},"2"),s&&t(n,{children:t("div",{children:"Third item"})},"3")]})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [showFirstItem, setShowFirstItem] = useState(true);
    const [showSecondItem, setShowSecondItem] = useState(true);
    const [showThirdItem, setShowThirdItem] = useState(false);
    const toggleFirstItem = () => setShowFirstItem(!showFirstItem);
    const toggleSecondItem = () => setShowSecondItem(!showSecondItem);
    const toggleThirdItem = () => setShowThirdItem(!showThirdItem);
    return <>
        <div className="group">
          <button onClick={toggleFirstItem} type="button">
            Toggle first item
          </button>
          <button onClick={toggleSecondItem} type="button">
            Toggle second item
          </button>
          <button onClick={toggleThirdItem} type="button">
            Toggle third item
          </button>
        </div>
        <hr />
        <TransitionGroup>
          {showFirstItem && <FadeTransition key="1">
              <div>First item</div>
            </FadeTransition>}
          {showSecondItem && <FadeTransition key="2">
              <div>Second item</div>
            </FadeTransition>}
          {showThirdItem && <FadeTransition key="3">
              <div>Third item</div>
            </FadeTransition>}
        </TransitionGroup>
      </>;
  }
}`,...e.parameters?.docs?.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,v as default};
