import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useStyles } from "./styles";

const Skeletons = () => {
  const classes = useStyles();
  const sMap = [1, 2];
  return (
    <div className={classes.body}>
      {sMap.map((value) => {
        return (
          <div key={value} className={classes.body}>
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
            <Skeleton className={classes.tableBody} width={"100%"} />
          </div>
        );
      })}
    </div>
  );
};

export default Skeletons;
