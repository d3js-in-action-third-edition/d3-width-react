import "./Axis.css";

const AxisBottom = props => {
  const numberOfTicks = props.innerWidth / 100;
  const ticks = props.scale.ticks(numberOfTicks);

  return <g transform={`translate(0, ${props.innerHeight})`} >
    <line className="axis-line" x1={0} y1={0} x2={props.innerWidth} y2={0} />
    {ticks.map(tick => (
      <text
        key={tick}
        className="axis-tick"
        x={props.scale(tick)}
        y={20}
        textAnchor="middle"
      >
        {tick}
      </text>
    ))}
    {props.label &&
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${props.innerWidth / 2}, 45)`}
      >
        {props.label}
      </text>
    }
  </g>
};

const AxisLeft = props => {
  const numberOfTicks = props.innerHeight / 50;
  const ticks = props.scale.ticks(numberOfTicks);

  return <g>
    <line className="axis-line" x1={0} y1={props.innerHeight} x2={0} y2={0} />
    {ticks.map(tick => (
      <text
        key={tick}
        className="axis-tick"
        x={-10}
        y={props.scale(tick)}
        textAnchor="end"
        alignmentBaseline="middle"
      >
        {tick}
      </text>
    ))}
    {props.label &&
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(-42, ${props.innerHeight / 2}) rotate(-90)`}
      >
        {props.label}
      </text>
    }
  </g>
};

const AxisBandBottom = props => {
  return <g transform={`translate(0, ${props.innerHeight})`} >
    {!props.hideLine && 
      <line className="axis-line" x1={0} y1={0} x2={props.innerWidth} y2={0} />
    }
    {props.ticks.map(tick => (
      <text
        key={tick}
        className="axis-tick"
        textAnchor={props.rotateTickLabels
          ? "end"
          : "middle"
        }
        alignmentBaseline="middle"
        transform={props.rotateTickLabels
          ? `translate(${props.scale(tick) + props.scale.bandwidth() / 2}, 8) rotate(-90)`
          : `translate(${props.scale(tick) + props.scale.bandwidth() / 2}, 35)`
        }
      >
        {tick}
      </text>
    ))}
  </g>
};

const Axis = props => {

  switch (props.type) {
    case "bottom":
      return AxisBottom(props);
    case "left":
      return AxisLeft(props);
    case "band":
      return AxisBandBottom(props);
    // no default
  };

};

export default Axis;