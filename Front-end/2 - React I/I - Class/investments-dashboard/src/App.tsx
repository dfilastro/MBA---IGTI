import Header from './components/Header';
import Table from './components/Table';

import './index.css';

import { data } from './data/investments';

const { investments, reports } = data;

// console.log(investments, reports);

export default function App() {
  return (
    <>
      <Header />

      <Table />
    </>
  );
}
