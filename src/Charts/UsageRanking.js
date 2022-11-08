import { Fragment } from 'react';
import * as d3 from 'd3';
import ChartContainer from '../ChartComponents/ChartContainer';
import Axis from '../ChartComponents/Axis';
import Curve from '../ChartComponents/Curve';
import Circle from '../ChartComponents/Circle';

const UsageRanking = props => {
  const width = 1200;
  const height = 500;
  const margin = {top: 30, right: 110, bottom: 40, left: 110};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);
  const yScale = d3.scalePoint()
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight]);

  return (
    <Fragment>
      <h2>Usage Rankings</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
      >
        <Axis 
          type="band"
          data={props.data.years}
          scale={xScale}
          ticks={props.data.years}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          hideLine={true}
        />
        {props.data.years.map(year => (
          <line 
            className="axis-line"
            key={`line-year-${year}`}
            x1={xScale(year)}
            y1={innerHeight}
            x2={xScale(year)}
            y2={0}
            strokeDasharray={"6 4"}
          />
        ))}
        {props.data.experience.map(d => (
          <g key={`curve-${d.id}`}>
            <Curve
              data={d.usage}
              xScale={xScale}
              yScale={yScale}
              xAccessor={"year"}
              yAccessor={"rank"}
              stroke={props.colorScale(d.id)}
              strokeWidth={5}
            />
            {d.usage[0].rank &&
              <text
                className="framework-label"
                x={-25}
                y={yScale(d.usage[0].rank)}
                textAnchor="end"
                alignmentBaseline="middle"
                fill={props.colorScale(d.id)}
                style={{ fontWeight: "bold" }}
              >
                {d.name}
              </text>
            }
            <text
              className="framework-label"
              x={innerWidth + 25}
              y={yScale(d.usage[d.usage.length - 1].rank)}
              alignmentBaseline="middle"
              fill={props.colorScale(d.id)}
              style={{ fontWeight: "bold" }}
            >
              {d.name}
            </text>
            {d.usage.map((usage, i) => (
              <Fragment key={`${d.id}-usage-${i}`}>
                {usage.rank &&
                  <g transform={`translate(${xScale(usage.year)}, ${yScale(usage.rank)})`}>
                    <Circle 
                      cx={0}
                      cy={0}
                      r={16}
                      fill={"#fff"}
                      stroke={props.colorScale(d.id)}
                      strokeWidth={3} 
                    />
                    <text
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="#374f5e"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      {`${Math.round(usage.percentage_question)}%`}
                    </text>
                  </g>
                }
              </Fragment>
            ))}
          </g>
        ))}
      </ChartContainer>
    </Fragment>
  )
};

export default UsageRanking;