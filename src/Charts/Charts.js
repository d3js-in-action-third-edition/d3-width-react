import { Fragment, useState } from 'react';
import * as d3 from 'd3';

import Rankings from './Rankings';
import Scatterplot from './Scatterplot';
import BarChart from './BarChart';

import '../Interactions/Interactions.css';

const Charts = props => {
  const [highlightedFramework, setHighlightedFramework] = useState("");

  const margin = {top: 30, right: 10, bottom: 50, left: 60};

  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids.map(id => id))
    .range(d3.schemeTableau10);

  const highlightedFrameworkHandler = (id) => {
    if (highlightedFramework !== id) {
      setHighlightedFramework(id);
    }
  };
  
  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-9'>
          <Rankings
            data={props.data}
            colorScale={colorScale}
            highlightedFramework={highlightedFramework}
            onMouseEvents={highlightedFrameworkHandler}
          />
        </div>
        <div className='col-3'>
          <div className='row'>
            <div className='col-12'>
              <Scatterplot 
                data={props.data.experience} 
                margin={margin} 
                colorScale={colorScale}
                highlightedFramework={highlightedFramework}
                onMouseEvents={highlightedFrameworkHandler}
              />
            </div>
            <div className='col-12'>
              <BarChart 
                data={props.data.experience} 
                margin={margin} 
                colorScale={colorScale}
                highlightedFramework={highlightedFramework}
                onMouseEvents={highlightedFrameworkHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and inspiration: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;