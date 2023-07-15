import React from "react";
import "./Tooltip.scss";
const Tooltip = (props) => {
  return <span className="tooltip">{props.text}</span>;
};

export default Tooltip;
