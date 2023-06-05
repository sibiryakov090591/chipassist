import React from "react";
import { Tooltip } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./circularProgressStyles";

interface Props {
  value: number; // percent %
  label: string;
  tooltip?: string;
}

const CircularProgress: React.FC<Props> = ({ value, label, tooltip }) => {
  const classes = useStyles();

  if (tooltip) {
    return (
      <Tooltip enterTouchDelay={1} classes={{ tooltip: classes.tooltip }} title={<div>{tooltip}</div>}>
        <div className={clsx(classes.svgContainer, classes.cursor)}>
          <svg className={classes.svg}>
            <circle className="bg" cx="20" cy="20" r="16" />
            <circle
              style={{
                stroke: value > 50 ? "#16be9f" : value > 25 ? "#ffba00" : value === 0 ? "transparent" : "#ff5722",
                strokeDashoffset: 719 - (100 - value),
              }}
              className="meter"
              cx="20"
              cy="20"
              r="16"
            />
          </svg>
          {label && <div className={classes.label}>{label}</div>}
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={classes.svgContainer}>
      <svg className={classes.svg}>
        <circle className="bg" cx="20" cy="20" r="16" />
        <circle
          style={{
            stroke: value > 50 ? "#16be9f" : value > 25 ? "#ffba00" : value === 0 ? "transparent" : "#ff5722",
            strokeDashoffset: 719 - (100 - value),
          }}
          className="meter"
          cx="20"
          cy="20"
          r="16"
        />
      </svg>
      {label && <div className={classes.label}>{label}</div>}
    </div>
  );
};
export default CircularProgress;
