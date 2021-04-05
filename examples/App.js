/** @jsx h */
import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { Transition, TransitionGroup } from '../src'
import CSSTransition from '../src/CSSTransition'
import StyleTransition from '../src/StyleTransition'

const colorItems = ['orange', 'purple', 'blue', 'red']
const duration = 500

export default () => {
  const [groupItems, setGroupsItems] = useState([Math.random()])
  const [visible, setVisibility] = useState(true)
  const toggleVisibility = () => setVisibility((oldVisible) => !oldVisible)
  const addGroupItem = () => setGroupsItems((oldGroupItems) => ([...oldGroupItems, Math.random()]))
  const removeFirstGroupItem = () => setGroupsItems(([, ...nextGroupItems]) => nextGroupItems)
  const removeGroupItem = (index) => setGroupsItems((oldGroupItems) => ([...oldGroupItems.slice(0, index), ...oldGroupItems.slice(index + 1)])) // eslint-disable-line
  const [colorItem, setColorItem] = useState(0)
  const switchPrevColorItem = () => setColorItem((prevColorItem) => Math.max(0, prevColorItem - 1))
  const switchNextColorItem = () => setColorItem((prevColorItem) => Math.min(colorItems.length - 1, prevColorItem + 1)) // eslint-disable-line
  return (
    <Fragment>
      <style>
        {'.root { margin: auto; width: 400px; max-width: 100%; font: 14px/1.4 monospace; } .root pre { font: inherit; }'}
        {'.container { background: beige; padding: 20px; margin: 20px; border-radius: 20px; }'}
        {`.item { background: seagreen; padding: 5px 10px; color: #fff; margin: 2px; transition: all ${duration}ms; border-radius: 5px; }`}
        {'.fade-appear { opacity: 0 }'}
        {'.fade-appear-active { opacity: 1 }'}
        {'.fade-appear-done { opacity: 1 }'}
        {'.fade-enter { opacity: 0 }'}
        {'.fade-enter-active { opacity: 1 }'}
        {'.fade-enter-done { opacity: 1 }'}
        {'.fade-exit { opacity: 1 }'}
        {'.fade-exit-active { opacity: 0 }'}
        {'.fade-exit-done { opacity: 0 }'}
      </style>

      <div className="root">
        <div className="container">
          <button onClick={toggleVisibility} type="button">Toggle visibility</button>

          <hr />

          <Transition
            in={visible}
            appear
            duration={duration}
            alwaysMounted
          >
            {(props) => (
              <div>
                <h5>Transition state</h5>
                <pre>{JSON.stringify(props, null, ' ')}</pre>
              </div>
            )}
          </Transition>

          <hr />

          <CSSTransition
            in={visible}
            appear
            duration={duration}
            classNames="fade"
          >
            <div className="item">
              Visible [using class name]
            </div>
          </CSSTransition>

          <hr />

          <StyleTransition
            in={visible}
            appear
            duration={duration}
            styles={{
              enter: { opacity: 0 },
              enterActive: { opacity: 1 },
              appear: { opacity: 0 },
              appearActive: { opacity: 1 },
              exit: { opacity: 1 },
              exitActive: { opacity: 0 },
            }}
          >
            <div className="item">
              Visible [using inline style]
            </div>
          </StyleTransition>
        </div>

        <div className="container">
          <button onClick={addGroupItem} type="button">Add item</button>
          {' '}
          <button onClick={removeFirstGroupItem} type="button">Remove first item</button>

          <hr />

          <TransitionGroup duration={duration}>
            {groupItems.map((groupItem, index) => (
              <CSSTransition
                key={groupItem}
                classNames="fade"
              >
                <div // eslint-disable-line
                  className="item"
                  onClick={() => removeGroupItem(index)}
                >
                  {`#${index} - ${groupItem}`}
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>

        <div className="container">
          <button onClick={switchNextColorItem} type="button">Next item color</button>
          {' '}
          <button onClick={switchPrevColorItem} type="button">Prev item color</button>

          <hr />

          <TransitionGroup duration={duration} exit={false}>
            <CSSTransition
              key={colorItem}
              classNames="fade"
            >
              <div className="item" style={{ background: colorItems[colorItem], display: 'inline-block', width: 100, textAlign: 'center' }}>
                {colorItems[colorItem]}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </Fragment>
  )
}
