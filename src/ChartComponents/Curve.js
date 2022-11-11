import { useRef, useEffect } from "react";
import * as d3 from "d3";

const Curve = props => {
  const pathRef = useRef();

  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor]))
    .defined(d => d.rank !== null)
    .curve(d3.curveMonotoneX);

  useEffect(() => {
    const path = pathRef.current;
    d3.select(path)
      .transition(props.t)
        .attr("d", lineGenerator(props.data));
  }, [props.data, props.t, lineGenerator]);

  return <path 
            ref={pathRef}
            fill="none" 
            stroke={props.stroke} 
            strokeWidth={props.strokeWidth}
            strokeLinecap="round" />
};

export default Curve;