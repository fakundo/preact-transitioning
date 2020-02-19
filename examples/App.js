/** @jsx h */
import { h, Fragment } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { Transition, CSSTransition, TransitionGroup } from '../src'

const colorItems = ['orange', 'purple', 'blue', 'red']
const duration = 200

export default () => {
  const [groupItems, setGroupsItems] = useState([Math.random()])
  const [visible, setVisibility] = useState(true)
  const toggleVisibility = useCallback(() => setVisibility((oldVisible) => !oldVisible))
  const addGroupItem = useCallback(() => setGroupsItems((oldGroupItems) => ([...oldGroupItems, Math.random()]))) // eslint-disable-line
  const removeGroupItem = useCallback(() => setGroupsItems(([, ...oldGroupItems]) => oldGroupItems))
  const [colorItem, setColorItem] = useState(0)
  const switchPrevColorItem = useCallback(() => setColorItem((prevColorItem) => Math.max(0, prevColorItem - 1))) // eslint-disable-line
  const switchNextColorItem = useCallback(() => setColorItem((prevColorItem) => Math.min(colorItems.length - 1, prevColorItem + 1))) // eslint-disable-line
  return (
    <Fragment>
      <style>
        {'.root { margin: auto; width: 400px; max-width: 100%; font: 14px/1.4 monospace; } .root pre { font: inherit; }'}
        {'.container { background: beige; padding: 20px; margin: 20px; border-radius: 20px; }'}
        {`.fade { background: seagreen; padding: 5px 10px; color: #fff; margin: 2px; transition: all ${duration}ms; border-radius: 5px; }`}
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
            { (props) => (
              <div>
                <h5>Transition state</h5>
                <pre>{ JSON.stringify(props, null, ' ') }</pre>
              </div>
            ) }
          </Transition>

          <hr />

          <CSSTransition
            in={visible}
            appear
            duration={duration}
            classNames="fade"
          >
            <div className="fade">
              Visible
            </div>
          </CSSTransition>
        </div>

        <div className="container">
          <button onClick={addGroupItem} type="button">Add item</button>
          {' '}
          <button onClick={removeGroupItem} type="button">Remove first item</button>

          <hr />

          <TransitionGroup duration={duration}>
            { groupItems.map((groupItem, index) => (
              <CSSTransition
                key={groupItem}
                classNames="fade"
              >
                <div className="fade">
                  { `#${index} - ${groupItem}` }
                </div>
              </CSSTransition>
            )) }
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
              <div className="fade" style={{ background: colorItems[colorItem], display: 'inline-block', width: 100, textAlign: 'center' }}>
                { colorItems[colorItem] }
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </Fragment>
  )
}
