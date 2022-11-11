const Rectangle = props => {
  const mouseEnterHandler = (id) => {
    props.onMouseEvents(id);
  };

  const mouseLeaveHandler = () => {
    props.onMouseEvents("");
  };

  return (
    <rect 
      className={props.isInactive ? "inactive" : ""}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      fill={props.fill}
      onMouseEnter={() => mouseEnterHandler(props.framework)}
      onMouseLeave={mouseLeaveHandler}
    />
  )
};

export default Rectangle;