import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import Charts from './Charts/Charts';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataURL = "https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    
    d3.json(dataURL).then(data => {
      console.log("data", data);
      setData(data);
      setLoading(false);
    });

    return () => undefined;
  }, []);

  return (
    <div className="container">
      {loading && <div>Loading...</div>}
      {!loading && <Charts data={data} />}
    </div>
  );
}

export default App;
