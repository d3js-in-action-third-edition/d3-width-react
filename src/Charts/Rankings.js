import React, { Fragment, useState } from 'react';
import * as d3 from 'd3';

import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Axis from '../ChartComponents/Axis';
import Curve from '../ChartComponents/Curve';
import Label from '../ChartComponents/Label';
import Badge from '../UI/Badge';

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");

  const width = 1000;
  const height = 542;
  const margin = {top: 45, right: 150, bottom: 60, left: 110};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);
  const yScale = d3.scalePoint()
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight]);

  const filterSelectionHandler = (id) => {
    if (activeFilter !== id) {
      setActiveFilter(id);
    }
  };

  const mouseEnterHandler = (id) => {
    props.onMouseEvents(id);
  };

  const mouseLeaveHandler = () => {
    props.onMouseEvents("");
  };

  const t = d3.transition()
    .duration(400)
    .ease(d3.easeBackOut);

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
        onFilterSelection={filterSelectionHandler}
      />
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
        {props.data.experience.map((framework, i) => (
          <g 
            key={`curve-${framework.id}`}
            onMouseEnter={() => mouseEnterHandler(framework.id)}
            onMouseLeave={mouseLeaveHandler}
          >
            <Curve
              data={framework[activeFilter]}
              xScale={xScale}
              yScale={yScale}
              xAccessor="year"
              yAccessor="rank"
              stroke={props.colorScale(framework.id)}
              strokeWidth={5}
              transition={t}
              isInactive={props.highlightedFramework.length > 0 && props.highlightedFramework !== framework.id}
            />
            {framework[activeFilter][0].rank &&
              <Label
                x={-25}
                y={yScale(framework[activeFilter][0].rank)}
                color={props.colorScale(framework.id)}
                label={framework.name}
                textAnchor={"end"}
                transition={t}
                isInactive={props.highlightedFramework.length > 0 && props.highlightedFramework !== framework.id}
              />
            }
            <Label
              x={innerWidth + 25}
              y={yScale(framework[activeFilter][framework[activeFilter].length - 1].rank)}
              color={props.colorScale(framework.id)}
              label={framework.name}
              textAnchor={"start"}
              transition={t}
              isInactive={props.highlightedFramework.length > 0 && props.highlightedFramework !== framework.id}
            />
            {framework[activeFilter].map((selection, i) => (
              <Fragment key={`${framework.id}-selection-${i}`}>
                {selection.rank &&
                  <Badge
                    translation={[xScale(selection.year), yScale(selection.rank)]}
                    strokeColor={props.colorScale(framework.id)}
                    label={`${Math.round(selection.percentage_question)}%`}
                    transition={t}
                    isInactive={props.highlightedFramework.length > 0 && props.highlightedFramework !== framework.id}
                  />
                }
              </Fragment>
            ))}
          </g>
        ))}
      </ChartContainer>
    </Card>
  )
};

export default Rankings;