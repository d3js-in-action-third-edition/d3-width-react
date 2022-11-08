import * as d3 from "d3";

const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor]))
    .defined(d => d.rank !== null)
    .curve(d3.curveMonotoneX);

  const line = lineGenerator(props.data);

  return <path 
            d={line} 
            fill="none" 
            stroke={props.stroke} 
            strokeWidth={props.strokeWidth}
            strokeLinecap="round" />
};

export default Curve;