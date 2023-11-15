import './App.css';
import { Counter } from './components/Counter/counter';
import { TableUI } from './components/Table/table';
import { ApiCall } from './components/Data/data';


function App() {
  const onMoney = (n: number) => console.log(`Here is your ${n}`)

  return (
    <div>
      <Counter description="My description" defaultCount={0} />
      <TableUI onMoney={onMoney} />
      <ApiCall />
    </div>
  );
}

export default App;
