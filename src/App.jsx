import { useEffect, useState } from 'react';
import Form from './components/Form';
import BumpChart from './components/Chart/BumpChart'
import * as d3 from 'd3'
function App() {

  const csvFilePath = `../public/MergedDataset.csv`;
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(csvFilePath)
      .then(function (data) {
        const jsonData = JSON.stringify(data);
        const first = JSON.parse(jsonData)
        setData(first)
      })
      .catch(function (error) {
        console.error('Error loading CSV:', error);
      });
  }, []);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header-inner">
            <Form data={data} />
          </div>
        </div>
      </div>
      <main className="main">
        <div className="container">
          <div className="main-inner">
            <div className="chart-head">
              <p className="chart-head-text">Rank changes over years</p>
            </div>
            <div className="chart">
              <BumpChart/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;