const Circle = props => {
  const mouseEnterHandler = (id) => {
    props.onMouseEvents(id);
  };

  const mouseLeaveHandler = () => {
    props.onMouseEvents("");
  };

  return (
    <circle 
      className={`${props.isBadge ? "badge" : ""} ${props.isInactive ? "inactive" : ""}`}
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      fill={props.fill}
      stroke={props.stroke ? props.stroke : "none"}
      strokeWidth={props.strokeWidth ? props.strokeWidth : 0} 
      onMouseEnter={() => mouseEnterHandler(props.framework)}
      onMouseLeave={mouseLeaveHandler}
    />
  )
};

export default Circle;