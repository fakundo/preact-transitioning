import{u as r}from"./jsxRuntime.module-CFb5ymYX.js";import"./preact.module-CLNnjL5T.js";import{d as a,y as i}from"./hooks.module-Bqmbac_-.js";import"./CSSTransition-D2FYEyZ0.js";import{T as c}from"./TransitionGroup-BnkI5oRw.js";import{F as d}from"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";const T={tags:["!dev"]},e={render:()=>{const[n,t]=a(0);return i(()=>{const s=setInterval(()=>{t(o=>o+1)},1e3);return()=>{clearInterval(s)}},[]),r(c,{duration:1e3,exit:!1,children:r(d,{children:r("div",{style:{fontSize:64},children:n})},n)})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sec, setSec] = useState(0);
    useEffect(() => {
      const i = setInterval(() => {
        setSec(prevSec => prevSec + 1);
      }, 1000);
      return () => {
        clearInterval(i);
      };
    }, []);
    return <TransitionGroup duration={1000} exit={false}>
        <FadeTransition key={sec}>
          <div style={{
          fontSize: 64
        }}>
            {sec}
          </div>
        </FadeTransition>
      </TransitionGroup>;
  }
}`,...e.parameters?.docs?.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,T as default};
