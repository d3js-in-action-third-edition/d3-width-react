import { useRef, useEffect } from "react";
import * as d3 from 'd3';

const Label = props => {
  const labelRef = useRef();

  useEffect(() => {
    const label = labelRef.current;
    d3.select(label)
      .transition(props.t)
        .attr("y", props.y);
  }, [props.y, props.t]);

  return (
    <text
      ref={labelRef}
      x={props.x}
      fill={props.color}
      style={{ fontWeight: "bold" }}
      textAnchor={props.textAnchor}
      alignmentBaseline="middle"
    >
      {props.label}
    </text>
  );
};

export default Label;