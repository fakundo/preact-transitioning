import ToggleExample from './ToggleExample';
import AddRemoveExample from './AddRemoveExample';
import ItemColorExample from './ItemColorExample';
import { Styles } from './Styles';

export default function App() {
  return (
    <div className="root">
      <Styles />
      <ToggleExample />
      <AddRemoveExample />
      <ItemColorExample />
    </div>
  );
}
