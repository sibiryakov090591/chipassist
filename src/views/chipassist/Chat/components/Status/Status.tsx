import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";

interface Props {
  status: "Offering" | "Requested" | "Delivering" | "Closed";
}

const Status: React.FC<Props> = ({ status }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.status, {
        [classes.offering]: status === "Offering",
        [classes.requested]: status === "Requested",
        [classes.delivering]: status === "Delivering",
        [classes.closed]: status === "Closed",
      })}
    >
      {status}
    </div>
  );
};

export default Status;
