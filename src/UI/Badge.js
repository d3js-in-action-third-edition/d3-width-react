import { useRef, useEffect } from "react";
import * as d3 from 'd3';

import Circle from "../ChartComponents/Circle";

const Badge = props => {
  const badgeRef = useRef();
  
  useEffect(() => {
    const badge = badgeRef.current;
    d3.select(badge)
      .transition(props.transition)
        .attr("transform", `translate(${props.translation[0]}, ${props.translation[1]})`);
  
  }, [props.translation, props.transition]);

  return (
    <g ref={badgeRef}>
      <Circle 
        cx={0}
        cy={0}
        r={18}
        fill={"#fff"}
        stroke={props.strokeColor}
        strokeWidth={3} 
      />
      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#374f5e"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {props.label}
      </text>
    </g>
  );
};

export default Badge;