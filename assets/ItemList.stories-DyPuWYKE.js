import{u as t}from"./jsxRuntime.module-CFb5ymYX.js";import{d as l}from"./hooks.module-Bqmbac_-.js";import{k as v}from"./preact.module-CLNnjL5T.js";import"./CSSTransition-D2FYEyZ0.js";import{T as k}from"./TransitionGroup-BnkI5oRw.js";import{F as g}from"./StyleFadeTransition-AHBQhhvc.js";import"./StyleTransition-ktvKYcXb.js";const s=()=>`Fading item #${Math.random().toString().substring(2,8)}`,E={tags:["!dev"]},m={render:()=>{const[i,a]=l(!1),[e,o]=l(()=>new Array(10).fill("").map(s)),d=()=>o([s(),...e]),u=()=>o([...e,s()]),c=()=>o(e.slice(1)),h=()=>o(e.slice(0,e.length-1)),f=()=>o([...e.slice(0,e.length/2),...e.slice(e.length/2+1)]),p=()=>o([...e.sort(()=>.5-Math.random())]),b=()=>a(!i),S=n=>()=>o([...e.slice(0,n),...e.slice(n+1)]);return t(v,{children:[t("div",{className:"group",children:[t("button",{onClick:d,type:"button",children:"+ Add item to the start"}),t("button",{onClick:u,type:"button",children:"+ Add item to the end"}),t("button",{onClick:c,type:"button",children:"× Remove item from the start"}),t("button",{onClick:f,type:"button",children:"× Remove item from the center"}),t("button",{onClick:h,type:"button",children:"× Remove item from the end"}),t("button",{onClick:p,type:"button",children:"? Shuffle items"}),t("label",{children:[t("input",{type:"checkbox",checked:i,onChange:b}),"Should animate shuffle"]})]}),t("hr",{}),t("div",{style:{display:"flex",flexDirection:"column",gap:".25rem"},children:t(k,{exit:!i,children:e.map((n,r)=>t(g,{children:t("div",{children:[t("button",{onClick:S(r),type:"button",children:"×"}),t("span",{children:[" ",n]})]})},i?`${n}${r}`:n))})})]})}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [shouldAnimateShuffle, setShouldAnimateShuffle] = useState(false);
    const [items, setItems] = useState(() => new Array(10).fill('').map(makeItem));
    const addToStart = () => setItems([makeItem(), ...items]);
    const addToEnd = () => setItems([...items, makeItem()]);
    const removeFromStart = () => setItems(items.slice(1));
    const removeFromEnd = () => setItems(items.slice(0, items.length - 1));
    const removeFromCenter = () => setItems([...items.slice(0, items.length / 2), ...items.slice(items.length / 2 + 1)]);
    const shuffle = () => setItems([...items.sort(() => 0.5 - Math.random())]);
    const toggleShouldAnimateShuffle = () => setShouldAnimateShuffle(!shouldAnimateShuffle);
    const removeItem = (index: number) => () => setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    return <>
        <div className="group">
          <button onClick={addToStart} type="button">
            + Add item to the start
          </button>
          <button onClick={addToEnd} type="button">
            + Add item to the end
          </button>
          <button onClick={removeFromStart} type="button">
            × Remove item from the start
          </button>
          <button onClick={removeFromCenter} type="button">
            × Remove item from the center
          </button>
          <button onClick={removeFromEnd} type="button">
            × Remove item from the end
          </button>
          <button onClick={shuffle} type="button">
            ? Shuffle items
          </button>
          <label>
            <input type="checkbox" checked={shouldAnimateShuffle} onChange={toggleShouldAnimateShuffle} />
            Should animate shuffle
          </label>
        </div>
        <hr />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.25rem'
      }}>
          <TransitionGroup exit={!shouldAnimateShuffle}>
            {items.map((item, index) => <FadeTransition key={shouldAnimateShuffle ? \`\${item}\${index}\` : item}>
                <div>
                  <button onClick={removeItem(index)} type="button">
                    ×
                  </button>
                  <span> {item}</span>
                </div>
              </FadeTransition>)}
          </TransitionGroup>
        </div>
      </>;
  }
}`,...m.parameters?.docs?.source}}};const R=["Default"];export{m as Default,R as __namedExportsOrder,E as default};
