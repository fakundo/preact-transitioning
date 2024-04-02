import { duration } from './config';
import ToggleExample from './ToggleExample';
import AddRemoveExample from './AddRemoveExample';
import ItemColorExample from './ItemColorExample';

export default function App() {
  return (
    <>
      <style>
        {
          '.root { margin: auto; width: 400px; max-width: 100%; font: 14px/1.4 monospace; } .root pre { font: inherit; }'
        }
        {'.container { background: beige; padding: 20px; margin: 20px; border-radius: 20px; }'}
        {`.item { background: seagreen; padding: 5px 10px; color: #fff; margin: 2px; transition: all ${duration}ms; border-radius: 5px; }`}
        {`button.item { border: 0; font: inherit; display: block; width: 100%; text-align: left; }`}
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
        <ToggleExample />

        <AddRemoveExample />

        <ItemColorExample />
      </div>
    </>
  );
}
