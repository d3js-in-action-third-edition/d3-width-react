import { Fragment } from 'react';
import * as d3 from 'd3';

import UsageRanking from './UsageRanking';
import Scatterplot from './Scatterplot';
import BarChart from './BarChart';

const Charts = props => {
  const margin = {top: 30, right: 10, bottom: 85, left: 60};

  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids.map(id => id))
    .range(d3.schemeTableau10);
  
  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-9'>
          <UsageRanking 
            data={props.data}
            colorScale={colorScale}
          />
        </div>
        <div className='col-3'>
          <div className='row'>
            <div className='col-12'>
              <Scatterplot 
                data={props.data.experience} 
                margin={margin} 
                colorScale={colorScale}
              />
            </div>
            <div className='col-12'>
              <BarChart 
                data={props.data.experience} 
                margin={margin} 
                colorScale={colorScale}
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